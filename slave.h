#ifndef SLAVE_H
#define SLAVE_H

#include <QGraphicsRectItem>
#include <QObject>
#include <QGraphicsScene>

class Slave: public QObject, public QGraphicsRectItem{
    Q_OBJECT
public:
    Slave();
    int prevX;
    int prevY;
};


#endif // SLAVE_H
