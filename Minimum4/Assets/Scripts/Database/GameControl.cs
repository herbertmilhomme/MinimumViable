#region Dll Import
using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Data;
using System;
#endregion

public class GameControl : MonoBehaviour
{
	//This is what i'll use to reference variables below
	public static GameControl control; //GameControl.control.playername
	
	//all variables below are public
	public string playername = "";
	//Table 
        string TrainerCard = "";
        //Columns
        int IDNumber;//Can remain null / SQL auto fill 
        //string Name; //Gamer's Name
        string TrainerName = "";//Player's iGN
        int TrainerID; //Random Unique 10digits
        int PublicID;//First 5 of digits above
        int Money; //assigned from Game Settings
        int PokedexOwned;//Can remain null / SQL auto fill 
        int PokedexSeen;//Can remain null / SQL auto fill
        DateTime StartTime = new DateTime();//Can remain null / SQL auto fill
        bool Gender;//True : Male
        int Badges;//Can remain null / SQL auto fill
        int Region;//Starting region for player (birth-place/used once)
        int Language;
        int ShadowCaught;//Can remain null / SQL auto fill
        int TrainerType;//Can remain null
        int DistanceTraveled = 0;
        int UserProfileID;//CurrentUserID
        //int HoursPlayed = new TimeSpan((DateTime)LastLog - DateTime.Now).AsInt(); 

        //Table
        //PlayerSetting
        //Columns
        //TrainerID
        int MapID;
        int Xcoord; //Can be written multiple times, stored per map change
        int Ycoord;
        int Zcoord;
        int PlayerDirection; //Player rotation
        int SpawnMap; //Stored once per event change
        int SpawnX; //
        int SpawnY;
        int SpawnZ;
        DateTime LastLog = DateTime.Now; //Dont think i want 'now' as a variable
        int RegionID; //Region player is currently located on (Region>MapID>Spawn/Coords)
        int LocationID; //i forgot what this was for
		int EventID; //Player's storyline
		
		//Table
		//PokemonParty
		int pokemonid1;
		//TrPokeMoves
		int move1_pp; //poke-id
	
	
	
	void Awake (){
		if(control == null){
			DontDestroyOnLoad(gameObject);
			control = this;
		}//this prevents duplicates
		else if (control != this){
			Destroy(gameObject);
		}
	}
	
	void Start (){}
	
	void Update (){}
}