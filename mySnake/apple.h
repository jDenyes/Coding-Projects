#ifndef APPLE_H
#define APPLE_H

#include <QGraphicsRectItem>
#include <QTimer>
#include <QObject>
#include <QGraphicsScene>
#include <QDebug>
#include <stdlib.h>


class Apple: public QObject, public QGraphicsRectItem{
    Q_OBJECT
public:
    Apple();
};


#endif // APPLE_H
