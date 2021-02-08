# To be run from teh desktop

# import matplotlib.pyplot as plt
import usrllib
from smb.SMBHandler import SMBHandler

opener = urllib.request.build_opener(SMBHandler)
fh = opener.open('smb://192.168.0.05/homepi/Coding/Coding-Project/StockDiversification');
data = fh.read()
fh.close()

print(data)


# fig = plt.figure()
# ax = fig.add_axes([0,0,1,1])
# stocks = ['MSFT', 'EMB', 'AMD']
# prices = [1, 4, 2]
# ax.bar(stocks, prices)
# plt.show()