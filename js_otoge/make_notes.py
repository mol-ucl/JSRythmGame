start_timing = 7780

timing = []
line = []

lane_number = 6

dif = "expert"

with open("note_"+dif+".txt",mode='r') as f:
    s = f.read()
    # print(s)
    s = s.replace(",","")
    s = s.split("\n")
    # print(s)

time = start_timing
for i in range(len(s)):
    space = 60*1000*4/158/len(s[i])
    for j in range(len(s[i])):
        if s[i][j] != " ":
            timing.append(round(time,2))
            # line.append(int(s[i][j]))
            if s[i][j] == "s":
                line.append(int(lane_number/2 - 1 - 2))
            elif s[i][j] == "d":
                line.append(int(lane_number/2 - 1 - 1))
            elif s[i][j] == "f":
                line.append(int(lane_number/2 - 1 - 0))
            elif s[i][j] == "j":
                line.append(int(lane_number/2))
            elif s[i][j] == "k":
                line.append(int(lane_number/2 + 1))
            elif s[i][j] == "l":
                line.append(int(lane_number/2 + 2))
        time = time + space

with open("timing_"+dif+".txt", mode='w') as f:
    f.write(str(timing))
with open("line_"+dif+".txt", mode='w') as f:
    f.write(str(line))
    
