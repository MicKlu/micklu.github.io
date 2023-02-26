import json;
import sys;

tags = set()

for path in sys.argv[1:]:
    with open(path, "r") as f:
        data = json.load(f)

        try:
            for t in data["tags"]:
                tags.add(t)
        except:
            pass

t = list(tags)
t.sort()

print(t)
