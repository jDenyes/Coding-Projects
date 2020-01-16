#include "div_toolbar.h"
#include <iostream>

div_ToolBar::div_ToolBar(const QString &title, QWidget* parent)
    : QToolBar(title, parent) {
    m_button = new QPushButton("Add Stock", this);
    addWidget(m_button);
    m_button->setGeometry(QRect(QPoint(100, 100), QSize(200, 50)));
    connect(m_button, SIGNAL (released()),this, SLOT (handleButton()));
}

div_ToolBar::~div_ToolBar() {

}

void div_ToolBar::handleButton() {
    QRect tempRect;
    if(inputText == nullptr) {
        tempRect = m_button->geometry();
    } else {
        tempRect = inputText->geometry();
    }

    int x = 0;
    int y = 0;
    int width = 0;
    int height = 0;

    QRect tempRect2 = m_button->geometry();
    tempRect2.getCoords(&x, &y, &width, &height);
    //&x, &y, &width, &height);

    printf("Button Location:\n\tx: %d, y: %d\n", x, y);

    inputText = new inputStock(this, &tempRect);
    addWidget(inputText);
}
