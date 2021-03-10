import matplotlib.pyplot as plt

tickers = []
quantities = []
marketValue = []
prices = []

with open("TickerPrices.txt", 'r') as f:
    data = f.read()
    splitData = data.split('\n')
    for line in splitData:
        if line != '':
            lineSplit = line.split(", ")
            tickers.append(lineSplit[0])
            quantities.append(int(lineSplit[1]))
            price = round(float(lineSplit[2]), 2)
            prices.append(price)
            marketValue.append(prices[-1] * quantities[-1])

fig = plt.figure()
ax = fig.add_axes([0,0,1,1])
ax.bar(tickers, marketValue)
plt.show()