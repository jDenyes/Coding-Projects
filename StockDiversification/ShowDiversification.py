# To be run from the desktop
import matplotlib.pyplot as plt
import os
import time
import subprocess

tickers = []
quantities = []
marketValue = []
prices = []

def main():
    UpdateStockPrices()
    # time.sleep(3)
    GetStockDiversification()
    # print(subprocess.check_call(['wsl', 'ls', '-l']))
    PlotGraph()

# def GetSectorDiversification():

def GetStockDiversification():
    with open("TickerPrices.txt", 'r') as f:
        data = f.read()
        splitData = data.split('\n')
        # print(splitData)
        for line in splitData:
            if line != '':
                # print(line)
                lineSplit = line.split(", ")
                # print(lineSplit)
                tickers.append(lineSplit[0])
                quantities.append(int(lineSplit[1]))

                if lineSplit[2] != "undefined":
                    price = round(float(lineSplit[2]), 2)
                else:
                    price = 0

                prices.append(price)
                marketValue.append(prices[-1] * quantities[-1])


# Plot information on a graph
def PlotGraph():
    fig = plt.figure()
    ax = fig.add_axes([0,0,1,1])
    ax.bar(tickers, marketValue)
    plt.show()

def UpdateStockPrices():
    os.system('cmd /c "nodejs UpdateStockPrices.js"')

main()