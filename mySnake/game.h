#ifndef GAME_H
#define GAME_H

#include <QGraphicsView>
#include <QWidget>
#include <QGraphicsScene>
#include <QGraphicsTextItem>
#include <QTimer>
#include <QFont>
#include <QVector>
#include "player.h"
#include "apple.h"
#include "score.h"
#include "slave.h"

class Game: public QGraphicsView{
    Q_OBJECT
public:
    Game(QWidget *parent=nullptr);
    void spawnApple();
    void addLength();
    int getLength();
    void updateSnakePos();
    void gameOver();
    void selfCollide();

    QGraphicsScene *scene;
    Player *player;
    Apple *apple;
    Score *score;
    Player *head;
    Slave *slave;
    QVector<Slave*> tail;

private:
    int snakeLength;

};


#endif // GAME_H
