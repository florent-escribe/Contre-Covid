 #! /usr/bin/env python3

import logging as log
log.basicConfig(level=log.INFO)

# get running version from local file
with open("VERSION") as VERSION:
    branch, commit, date = VERSION.readline().split(" ")

# start flask service
from flask import Flask, jsonify, request, Response
app = Flask("kiva")

import datetime as dt
started = dt.datetime.now()

# get flask configuration, or fall back on environment
from os import environ as ENV

if "APP_CONFIG" in ENV:
    log.info(f"configuring from {ENV['APP_CONFIG']}")
    app.config.from_envvar("APP_CONFIG")
    CONF = app.config  # type: ignore
else:
    log.info("configuring from environment")
    CONF = ENV  # type: ignore

# web app
if CONF.get("ENABLE_FLASK_CORS", False):
    from flask_cors import CORS  # type: ignore
    CORS(app)

# create database connection and load queries
import anodb  # type: ignore

db = anodb.DB(
    CONF["DB_TYPE"], CONF["DB_CONN"], CONF["DB_SQL"], CONF["DB_OPTIONS"]
)


#
# Request parameters, in json, form or args…
#
PARAMS = {}

def set_params():
    global PARAMS
    PARAMS = request.values if request.json is None else request.json

app.before_request(set_params)


#
# AAA: Authentication, Authorization and Audit
#
# Authorizations are mostly the realm of the application itself, once
# the initial access is granted.
#
# Authentication and Audit are best delegated to the web server.
#
# Alas, flask development server (aka Werkzeug) does not know how to do
# Authentication:-(
#
# The usual flask solution is to handle it in flask itself, which looks
# like a poor choice because it is quite inefficient.
# The work around is that *under testing*, the `LOGIN` parameter is accepted
# as a login claim, # and tests can take advantage of this.
# Obviously, this behavior is not welcome in production.
#
# Sigh.
#
LOGIN: str = ""

# setup LOGIN through a hook
if CONF.get("TESTING", False):
    # this ugly hack is only for local testing purposes…
    def set_login():
        assert CONF["TESTING"]
        assert request.remote_user is None
        assert request.environ["REMOTE_ADDR"] == "127.0.0.1"
        global LOGIN
        LOGIN = PARAMS.get("LOGIN", None)
        log.debug(f"LOGIN: {LOGIN}")
else:
    def set_login():
        global LOGIN
        LOGIN = request.remote_user

app.before_request(set_login)


#
# *ALWAYS* commit after request execution
#
# Otherwise the connection is left 'idle in transaction',
# which blocks dumps and the like.
#
# Note: given the simple queries involved, it could probably
# be enough to turn autocommit on.
#
def db_commit(res: Response):
    try:
        db.commit()
        return res
    except Exception as err:
        log.warning(f"db.commit() failed: {err}")
        return "commit failed", 500

app.after_request(db_commit)



#
# GET /user
# returns the adresses
#
@app.route("/user", methods=["GET"])
def get_addresse_all():
    res = db.get_addresse_all()
    import json
    log.info(json.dumps(res))
    return jsonify(res), 200

#
# GET /user/login
# returns the uid of the user identified in the params
#
@app.route("/user/login/<unom>", methods=["GET"])
def get_user_uid (unom):
    res = db.get_user_uid(unom=unom)
    return jsonify(res), 200



    



#
# GET /user/<uid>/info
# returns all the info of the user
#
@app.route("/user/<uid>/info", methods=['GET'])
def get_infos_utilisateur_all(uid):
    res = db.get_infos_utilisateur_all(uid=uid)
    #log.info(json.dumps(res))
    return jsonify(res), 200

#
# GET /user/<uid>
# returns l'état covid de user uid
#
@app.route("/user/<uid>", methods=['GET'])
def get_user_covid_state(uid):
    res = db.get_user_covid_state(uid=uid)
    return jsonify(res), 200

#
# GET /user/contact/<uid>
# returns all the contacts de user uid
#
@app.route("/user/contact/<uid>", methods=['GET'])
def get_user_contact(uid):
    res = db.get_user_contact(uid=uid)
    return jsonify(res), 200

#
#GET /user/position/<uid>
#returns latitude and longitude
#
@app.route("/user/position/<uid>", methods=["GET"])
def get_position_user(uid):
    res = db.get_position_user(uid=uid)
    return  jsonify(res), 200

#
# GET /user/test/<uid>
# returns all the contacts de user uid
#
@app.route("/user/test/<uid>", methods=['GET'])
def get_user_test(uid):
    res = db.get_user_test(uid=uid)
    return jsonify(res), 200

#
# PUT /user/update/info/<uid>
# update mail of an user
#
@app.route("/user/update/mail/<uid>", methods=['PUT'])
def get_update_user_mail(uid):
    res = db.get_update_user_mail(uid=uid)
    return jsonify(res), 405

"""@app.route("/user/add", methods=['POST'])
def set_user():
    db.set_user(unom=["unom"], uprenom=["uprenom"], umail=["umail"], utel=["utel"], ville=["ville"], departement=["departement"], region=["region"])
    return "", 200"""

#
#GET /retail/info/<cid>
#returns all the info of the retail
#
@app.route("/retail/info/<cid>", methods=['GET'])
def get_infos_retail_all(cid):
    res = db.get_infos_retail_all(cid=cid)
    return jsonify(res), 200

#
#GET /retail/type
#returns all the type of retails
#
@app.route("/retail/type", methods=['GET'])
def get_type_retail_all():
    res = db.get_type_retail_all()
    return jsonify(res), 200

#
#GET /retail/employees
#returns all the employees of a retail
#
@app.route("/retail/employees/<cid>", methods=['GET'])
def get_infos_employees_retail(cid):
    res = db.get_infos_employees_retail(cid=cid)
    return jsonify(res), 200

#
# POST /retail
# Adds a retail to the database (table commerce)
#
@app.route("/retail/add", methods=["POST"])
def add_retail():
    if True :
        db.add_retail(cnom=PARAMS["cnom"],surface=PARAMS["surface"],tnom=PARAMS["tnom"],ville=PARAMS["ville"],departement=PARAMS["departement"],region=PARAMS["region"] )
        db.commit()
        return(Response(status=201))
    else:
        return(Response(status=400))
