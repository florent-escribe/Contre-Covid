#! /usr/bin/env python3
#
# Test against a running local kiva server, including expected failures.
#
# The test assumes some initial data and resets the database
# to the initial state, so that it can be run several times
# if no failure occurs.
#
# The test could initialiaze some database, but I also want to
# use it against a deployed version and differing databases,
# so keep it light.

# import pytest  # type: ignore
import json
import re

from os import environ as ENV

from typing import Dict, Union, Tuple

# local flask server test by default
URL = ENV.get('APP_URL', 'http://0.0.0.0:5000')

# real (or fake) authentication
ADMIN, WRITE, READ, NONE = 'kiva', 'calvin', 'hobbes', 'moe'
AUTH: Dict[str, Union[str, None]] = {}
if 'APP_AUTH' in ENV:
    # we are running with a real server with authentication
    for up in ENV['APP_AUTH'].split(','):
        user, pw = up.split(':', 2)
        AUTH[user] = pw
    real_auth = True
else:
    # else we assume 3 test users
    AUTH[ADMIN] = None
    AUTH[WRITE] = None
    AUTH[READ] = None
    AUTH[NONE] = None
    real_auth = False

# reuse connections…
from requests import Session
requests = Session()

# convenient function to send an http request and check the result with a re
def check_api(method: str, path: str, status: int, content: str = None,
              login: str = ADMIN, **kwargs):
    # work around Werkzeug inability to handle authentication transparently
    auth: Union[Tuple[str, Union[str, None]], None] = None
    if login is not None:
        if real_auth:
            # real http server which handles authentication
            auth = (login, AUTH[login])
        else:
            # test against local http server, apply work around
            if 'json' in kwargs:
                kwargs['json']['LOGIN'] = login
            elif 'data' in kwargs:
                kwargs['data']['LOGIN'] = login
            else:
                kwargs['data'] = {'LOGIN': login}
    else:
        auth = None
    r = requests.request(method, URL + path, auth=auth,
                         **kwargs)  # type: ignore
    assert r.status_code == status
    if content is not None:
        assert re.search(content, r.text, re.DOTALL) is not None
    return r.text

# work around SQLite lack of booleans
VERSION = check_api('GET', '/version', 200, login=ADMIN)
DB = json.loads(VERSION)['db']

if DB.startswith('postgres'):
    TRUE, FALSE = True, False   # type: ignore
else:
    TRUE, FALSE = 1, 0  # type: ignore

# sanity check
def test_sanity():
    assert re.match(r"https?://", URL)
    assert ADMIN in AUTH
    assert WRITE in AUTH
    assert READ in AUTH
    assert DB.startswith('postgres') or DB == 'sqlite'

# /whatever # BAD URI
def test_whatever():
    check_api('GET', '/whatever', 404)
    check_api('POST', '/whatever', 404)
    check_api('DELETE', '/whatever', 404)
    check_api('PUT', '/whatever', 404)
    check_api('PATCH', '/whatever', 404)

# /version
def test_version():
    # only GET is implemented
    check_api('GET', '/version', 200, '"kiva"', login=ADMIN)
    check_api('GET', '/version', 200, '"kiva"', login=WRITE)
    check_api('GET', '/version', 200, '"kiva"', login=READ)
    # check_api('GET', '/version', 403, login=NONE)
    check_api('POST', '/version', 405)
    check_api('DELETE', '/version', 405)
    check_api('PUT', '/version', 405)
    check_api('PATCH', '/version', 405)

# /store
def test_store():
    check_api('GET', '/store', 200, r'\[.*\]', login=READ)
    # initial data
    check_api('GET', '/store?filter=k%', 200, 'kiva', login=READ)
    check_api('GET', '/store', 200, '"kiva"',
              data={'filter': 'k%'}, login=READ)
    check_api('GET', '/store', 200, '"calvin"',
              data={'filter': 'c%'}, login=READ)
    check_api('GET', '/store', 200, '"hello"',
              json={'filter': 'h%'}, login=READ)
    # insert data
    # check_api('POST', '/store', 403,
    #           data={'key': 'hobbes', 'val': 'calvin'}, login=READ)
    check_api('POST', '/store', 201,
              data={'key': 'hobbes', 'val': 'calvin'}, login=WRITE)
    check_api('GET', '/store', 200, '"hobbes"',
              json={'filter': 'ho%'}, login=READ)
    # insert json, graceful update…
    # check_api('POST', '/store', 403,
    #           json={'key': 'hobbes', 'val': 'susie'}, login=READ)
    check_api('POST', '/store', 201,
              json={'key': 'hobbes', 'val': 'susie'}, login=WRITE)
    check_api('GET', '/store', 200, '"susie"',
              json={'filter': 'hobbes'}, login=READ)
    # check_api('DELETE', '/store', 403, data={'filter': 'hobbes'}, login=READ)
    # check_api('DELETE', '/store', 403, data={'filter': 'hobbes'},
    #           login=WRITE)
    check_api('DELETE', '/store', 204, data={'filter': 'hobbes'}, login=ADMIN)
    check_api('GET', '/store', 200, json={'filter': 'hobbes'}, login=READ)
    check_api('GET', '/store', 200, '"kiva"',
              data={'filter': 'k%'}, login=READ)
    # check_api('DELETE', '/store', 403, login=READ)
    # check_api('DELETE', '/store', 403, login=WRITE)
    check_api('DELETE', '/store', 204, login=ADMIN)
    check_api('GET', '/store', 200, r"^\s*\[\s*\]\s*$", login=READ)
    # restore initial data
    check_api('POST', '/store', 201,
              json={'key': 'calvin', 'val': 'hobbes'}, login=WRITE)
    check_api('POST', '/store', 201,
              json={'key': 'hello', 'val': 'world'}, login=ADMIN)
    check_api('POST', '/store', 201,
              data={'key': 'kiva', 'val': 'cool'}, login=WRITE)
    # not implemented
    check_api('PUT', '/store', 405, login=READ)
    check_api('PATCH', '/store', 405, login=READ)

# /store/<key>
def test_store_key():
    # initial data
    check_api('GET', '/store/calvin', 200, r'^"hobbes"$', login=READ)
    check_api('GET', '/store/hello', 200, r'^"world"$', login=READ)
    check_api('GET', '/store/kiva', 200, r'^"cool"$', login=READ)
    # hobbes
    check_api('GET', '/store/hobbes', 404, login=READ)
    check_api('POST', '/store/hobbes', 405, login=READ)
    check_api('POST', '/store', 201,
              json={'key': 'hobbes', 'val': 'rosalyn'}, login=WRITE)
    check_api('GET', '/store/hobbes', 200, '"rosalyn"', login=READ)
    # check_api('DELETE', '/store/hobbes', 403, login=READ)
    check_api('DELETE', '/store/hobbes', 204, login=WRITE)
    check_api('GET', '/store/hobbes', 404, login=READ)  # deleted
    # check_api('PUT', '/store/hobbes', 403, data={'val': 'susie'}, login=READ)
    check_api('PUT', '/store/hobbes', 201, data={'val': 'susie'}, login=WRITE)
    check_api('GET', '/store/hobbes', 200, '"susie"', login=READ)
    check_api('PUT', '/store/hobbes', 201,
              json={'val': 'wormwood'}, login=WRITE)
    check_api('GET', '/store/hobbes', 200, '"wormwood"', login=READ)
    # check_api('PATCH', '/store/hobbes', 403, data={'val': 'mom'}, login=READ)
    check_api('PATCH', '/store/hobbes', 201, data={'val': 'mom'}, login=WRITE)
    check_api('GET', '/store/hobbes', 200, '"mom"', login=READ)
    check_api('PATCH', '/store/hobbes', 201, json={'val': 'dad'}, login=ADMIN)
    check_api('GET', '/store/hobbes', 200, 'dad', login=READ)
    # cleanup
    # check_api('DELETE', '/store/hobbes', 403, login=READ)
    check_api('DELETE', '/store/hobbes', 204, login=WRITE)
    # missing resource
    check_api('GET', '/store/hobbes', 404, login=READ)
    check_api('DELETE', '/store/hobbes', 404, login=WRITE)
    # missing val parameter
    check_api('PUT', '/store/hobbes', 400, login=WRITE)
    check_api('PATCH', '/store/hobbes', 400, login=WRITE)
    # not implemented
    check_api('POST', '/store/hobbes', 405, login=ADMIN)
