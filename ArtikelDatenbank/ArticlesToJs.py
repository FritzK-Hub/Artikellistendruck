import os
import json
from tqdm import tqdm

jsObject = "const articleDatabase = {{ {data} \n}}"
jsKV = "\n\t{key}: {{ uvp:{uvp},attr:\"{attr}\" }},"
data = ""
articlePaths = os.listdir("./ArtikelDatenbank/Articles")
index = 3
for article in tqdm(articlePaths):
    with open('./ArtikelDatenbank/Articles/'+article, 'r', encoding='UTF-8') as file:
        filedata = json.loads(file.read())
        articleKey = 'K' + article.replace('.txt', '')
        data += jsKV.format(key = articleKey, uvp = filedata['uvp'], attr = (filedata['attributes'].replace("\"", "\\\"")))
        # print(dataShell.format(data = key))
    # index -= 1
    # if (index < 0):
    #     break
with open('./Interface/Js/Articles.js', 'w', encoding="UTF-8") as file:
    file.write(jsObject.format(data = data))
# print(len(articlePaths))
# print(os.getcwd())

