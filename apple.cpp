#include "apple.h"
#include "game.h"
#include <QRandomGenerator>
#include <QTime>
#include <ctime>

extern Game * game;

Apple::Apple(): QObject(), QGraphicsRectItem ()
{
    QRandomGenerator *randNum = new QRandomGenerator(time(nullptr));
    int randX = randNum->bounded(60)*20;
    int randY = randNum->bounded(40)*20;
    setPos(randX+1,randY+1);
    setRect(0,0,18,18);
    setBrush(Qt::red);
}
