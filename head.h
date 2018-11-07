#ifndef HEAD_H
#define HEAD_H

#include <QObject>
#include <QGraphicsRectItem>
#include "segment.h"

class Head: public QObject, public QGraphicsRectItem{
    Q_OBJECT
public:
    Head():
};

#endif // HEAD_H
