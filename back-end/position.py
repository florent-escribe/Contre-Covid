import numpy as np 

position_monnier = [[48.844581604003906, 2.34216046333313]]
position_escribe = [[48.843955993652344, 2.3389739990234375]]
position_wang = [[48.84057906364237, 2.3392341732978883]]
position_el_khoury = [[48.84102038995935, 2.32046407461167]]

for i in range(1, 300):
    position_monnier.append([position_monnier[i-1][1] - 0.00005), position_monnier[i-1][2] - 0.00005])
    position_escribe.append([position_escribe[i-1][1] - 0.00004), position_escribe[i-1][2] + 0.00004])
    position_wang.append([position_wang[i-1][1] + 0.00005), position_wang[i-1][2] + 0.00005])
    position_el_khoury.append([position_el_khoury[i-1][1] - 0.00005), position_el_khoury[i-1][2] - 0.00005])
