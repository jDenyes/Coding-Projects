#include "game.h"

Game::Game(QWidget *parent)
{
    snakeLength = 0;
    scene = new QGraphicsScene();
    scene->setSceneRect(0,0,1200,800);
    setScene(scene);
    setHorizontalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
    setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
    setFixedSize(1200,800);

    addLength(); //adds length to the snake, in this case creates the snake head

    QTimer *moveTimer = new QTimer(); //starts the moveTimer
    connect(moveTimer,SIGNAL(timeout()),head,SLOT(move()));
    moveTimer->start(50);

    score = new Score(); //creates the score TextWidget
    scene->addItem(score);

    spawnApple(); //spawns the first apple
}

void Game::spawnApple()
{
    Apple *apple = new Apple();
    scene->addItem(apple);
}

void Game::updateSnakePos()
{
    if(snakeLength > 1)
    {
        slave = tail.at(0);
        slave->prevX = int(slave->x());
        slave->prevY = int(slave->y());
        slave->setPos(head->lastX,head->lastY);
        for(int i=1;i<=snakeLength-2;i++)
        {
            slave = tail.at(i);
            slave->prevX = int(slave->x());
            slave->prevY = int(slave->y());
            slave->setPos(tail.at(i-1)->prevX,tail.at(i-1)->prevY);
            if((slave->x() == head->x()) && (slave->y() == head->y()))
            {
                gameOver();
            }
        }
    }
}

void Game::addLength()
{
    if(getLength() == 0)
    {
        head = new Player();
        head->setFlag(QGraphicsItem::ItemIsFocusable);
        head->setFocus();
        scene->addItem(head);
        snakeLength ++;
    }
    else if(getLength() == 1)
    {
        slave = new Slave();
        slave->setPos(head->lastX, head->lastY);
        tail.push_back(slave);
        scene->addItem(slave);
        snakeLength++;
    }
    else
    {

        slave = new Slave();
        slave->setPos(tail.at(getLength()-2)->prevX,tail.at(getLength()-2)->prevY);
        tail.push_back(slave);
        snakeLength++;
        scene->addItem(slave);
    }
}

int Game::getLength()
{
    return snakeLength;
}

/*
void Game::selfCollide() //check for collision in snake Update function right after they move
{
    if(tail.size()>1)
    {
        for(int i=2;i<tail.size()-2;i++)
        {
            if(int(head->x()) == int(tail.at(i)->x()))
            {
                if(int(head->y()) == int(tail.at(i)->y()))
                {
                    gameOver();
                    qDebug() << "Snake Part: " << i << '\n';
                    qDebug() << "HEAD X: " << head->x() << '\n';
                    qDebug() << "HEAD Y: " << head->y() << '\n';
                    //qDebug() << "snake X: " << tail.at(i)->x() << '\n';
                    //qDebug() << "snake Y: " << tail.at(i)->x() << '\n';
                }
            }
        }
    }
}

*/

void Game::gameOver() //have to actaully delete the snake body, I only make them disappear right now
{

    score->reset();
    head->setPos(580,380);
    head->state = "DEAD";
    if(tail.size()>0)
    {
        for(int i=0;i<=snakeLength-2;i++)
        {
            scene->removeItem(tail.at(i));
        }
    }
    tail.clear();
    snakeLength = 1;
    //scene->removeItem(apple);
    //delete(apple);
    //spawnApple();
}
