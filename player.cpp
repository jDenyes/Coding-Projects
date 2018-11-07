#include "player.h"
#include "apple.h"
#include "game.h"
#include <QList>

extern Game * game;

Player::Player(): QGraphicsRectItem ()
{
    setRect(0,0,18,18);
    setBrush(Qt::blue);
    setPos(581,381);
    state = "0";
}

void Player::keyPressEvent(QKeyEvent *event)
{
    if(event->key() == Qt::Key_Left && state != "RIGHT")
        state = "LEFT";
    else if(event->key() == Qt::Key_Right && state != "LEFT")
        state = "RIGHT";
    else if(event->key() == Qt::Key_Down && state != "UP")
        state = "DOWN";
    else if(event->key() == Qt::Key_Up && state != "DOWN")
        state = "UP";
}

void Player::move()
{
    game->updateSnakePos();
    collisionCheck();
    if(state == "LEFT")
    {        
        if(pos().x() < 0)
        {
            restart();
            return;
        }
        setPos(x()-20,y());
        lastX = int(x());
        lastY = int(y());
    }
    else if(state == "RIGHT")
    {
        if(pos().x() + rect().width() > 1200)
        {
            restart();
        }
        setPos(x()+20,y());
        lastX = int(x());
        lastY = int(y());
    }
    else if(state == "DOWN")
    {
        if(pos().y() + rect().height() > 800)
        {
            restart();
        }
        setPos(x(),y()+20);
        lastX = int(x());
        lastY = int(y());
    }
    else if(state == "UP")
    {
        if(pos().y() < 0)
        {
            restart();
        }
        setPos(x(),y()-20);
        lastX = int(x());
        lastY = int(y());
    }
    for(int i=1;i<=game->getLength()-2;i++)
    {
        {
            if((game->tail.at(i)->x() == game->head->x()) && (game->tail.at(i)->y() == game->head->y()))
            {
                game->gameOver();
            }
        }
    }
}

void Player::restart()
{
    setPos(580,380);
    state = "DEAD";
    game->gameOver();
}

void Player::collisionCheck()
{
    QList<QGraphicsItem*> collision = collidingItems();
    int n = collision.size();

    for(int i=0;i<n;i++)
    {
        if(typeid(*(collision[i])) == typeid(Apple))
        {
            scene()->removeItem(collision[i]);
            delete collision[i];
            game->score->increase();
            game->spawnApple();
            game->addLength();
         }
    }
}
