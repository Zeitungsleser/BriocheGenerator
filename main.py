import random

def choose(elmts, k):
    if k==1:
        return [random.choice(elmts)]
    elem = random.choice(elmts)
    elmts.remove(elem)
    choices = choose(elmts, k-1)
    choices.append(elem)
    return choices

def sum_line(line):
    sum = 0
    for i in line:
        match i:
            case 'v':
                sum += 1
            case 'w':
                sum += 2
            case 'l':
                sum -= 1
            case 'r':
                sum -= 1
            case 's':
                sum -= 2
    return sum

def check(line):
    for idx,i in enumerate(line):
        if i=='l' or i=='r':
            if idx == 0:
                return False
            if line[idx-1] != '|':
                return False
        if i=='s':
            if idx == len(line)-1 or idx==0:
                return False
            if line[idx-1] != '|' or line[idx+1] != '|':
                return False
    return True

#m = int(input("Wie viele Maschen? (nur Vorderseite)"))
m=10
#n = int(input("Wie viele Reihen?"))
n=10

out=[]

#erste Reihe
line=[]
for i in range(m):
    line.append('|')
out.append(line)
print(line)

#zweite Reihe
for j in range(n):
    alle_masch = list(range(m))
    anz_masch = random.randint(m//3,m//4+1)
    sel_masch = choose(alle_masch.copy(),anz_masch)
    line = []
    while True:
        for masch in alle_masch:
            possibilitys = ['v', 'w', 'l', 'r','s']
            if masch in sel_masch:
                line.append(random.choice(possibilitys))
            else:
                line.append('|')
        if sum_line(line) == 0 and check(line):
            break
        line = []
    print(line)