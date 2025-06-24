from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://web.whatsapp.com")

input("Escaneie o QR Code e pressione Enter...")

chats = driver.find_elements(By.CLASS_NAME, 'x1iyjqo2 x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft x1rg5ohu _ao3e')
for chat in chats:
    if chat.text == 'Afonso Tvsc':
        print(chat.text)

driver.quit()
