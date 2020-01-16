#include "inputstock.h"
#include <iostream>

inputStock::inputStock(QWidget *parent, QRect *prevPosition)
    : QDockWidget (parent)
{
    ticker = new QTextEdit(this);
    quantity = new QTextEdit(this);

    std::cout << "0x1" << std::endl;

    int x = 0;
    int y = 0;
    int width = 0;
    int height = 0;

    prevPosition->getCoords(&x, &y, &width, &height);

    std::cout << "0x2" << std::endl;

    prevPosition->setRect(x, y - height, width, height);

    std::cout << "0x3" << std::endl;
}

inputStock::~inputStock() {

}
