class Model
{
    constructor()
    {
        this._score=0;
    }
    set score(val)
    {
        this._score=val;
        emitter.emit(G.SCORE_UPDATED);
    }
    get score(){
        return this._score;
    }

    // when user selects options in menu, this hold data for constructing the player's paddle during the game.
    


}