#ifndef PLAYER_H
#define PLAYER_H

#include <QGraphicsRectItem>
#include <QKeyEvent>
#include <QGraphicsScene>
#include <QDebug>
#include <QObject>
#include <QTimer>
#include <QString>
#include <stdlib.h>
#include <apple.h>

class Player: public QObject, public QGraphicsRectItem{
    Q_OBJECT
public:
    Player();
    void keyPressEvent(QKeyEvent *event);
    QString state;
    int lastX;
    int lastY;
public slots:
    void move();
private:
    void restart();
    void collisionCheck();
};

#endif // PLAYER_H
