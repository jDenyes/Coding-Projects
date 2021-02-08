import matplotlib.pyplot as plt

fig = plt.figure()
ax = fig.add_axes([0,0,1,1])
stocks = ['MSFT', 'EMB', 'AMD']
prices = [1, 4, 2]
ax.bar(stocks, prices)
plt.show()