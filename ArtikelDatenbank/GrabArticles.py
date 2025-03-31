import requests
import os
import json
from bs4 import BeautifulSoup
# filename = "./schrauben-und-eisenwaren/eisenwaren-und-kleineisen/stangen/flachstange-20-x-4-mm-2-m-stahl-warmgewalzt-289050456.html"
# os.makedirs(os.path.dirname(filename), exist_ok=True)
# with open(filename, "w", encoding="utf-8") as f:
    # f.write("test")
# f = open("./article.html", "r")
# r = requests.get('https://www.sonderpreis-baumarkt.de/schrauben-und-eisenwaren/eisenwaren-und-kleineisen/stangen?sz=2000')
# soup = BeautifulSoup(f.read(), 'html.parser')
# print(soup.prettify())
# with open("./article.html", "w", encoding="utf-8") as f:
    # f.write(soup.prettify())
# s = soup.find_all('a', class_='product-tile__product-link')

# for a in s:
    # print(a.attrs["href"])
with open('Links.txt', 'r') as link_file:
    for href in link_file:
        print(href)
        request = requests.get(href)
        soup = BeautifulSoup(request.content, 'html.parser', from_encoding='utf-8')
        articles = soup.find_all('a', class_='product-tile__product-link')
        for article in articles:
            href = article.attrs["href"]
            print("\t"+href)
            article_request = requests.get("https://www.sonderpreis-baumarkt.de" + href)
            soup = BeautifulSoup(article_request.content, 'html.parser', from_encoding='utf-8')
            article_attributes = soup.find('div', class_='grid-item product-attributes').decode_contents().replace('\n', '')
            article_uvp = soup.find('div', class_='pricing-list')
            uvp_integer = "0,"
            uvp_fractional = "0"
            uvp = 0
            if article_uvp is not None:
                uvp_integer = article_uvp.find('div', class_='pricing-list__integer').decode_contents().replace('\n', '').replace(' ', '').replace('\t', '')
                uvp_fractional = article_uvp.find('div', class_='pricing-list__fractional').decode_contents().replace('\n', '').replace(' ', '').replace('\t', '')
                uvp = float((uvp_integer + uvp_fractional).replace(',', '.')) 
            article_id = soup.find('span', class_='product-id').decode_contents()
            
            #os.makedirs(os.path.dirname("."+href), exist_ok=True)
            with open("./Articles/"+article_id+".txt", 'w', encoding='utf-8') as f:
                f.write(json.dumps({'uvp': uvp, 'attributes': article_attributes}, indent=4, ensure_ascii=False))
            # break
        # break