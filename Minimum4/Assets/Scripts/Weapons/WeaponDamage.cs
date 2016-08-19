using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class WeaponDamage : MonoBehaviour
{
	//General
	public int maxDmg;					// The max amount of health the weapon can take
	public int minDmg;					// The min amou
	public int drpoffStart;				// Distance weapon begins to fall off and weaken 
	public int drpoffEnd;				// Distance weapon reaches minimum damage
	public int fireRate;				// The speed the damageImage will fade at.
	public float bulletSpd;				//
	public int magSize;					// The current ammo the weapon starts with
	public int ammoStart;				// The current health the player has.
	public int ammoMax;					// The most ammo a weapon can hold

	//Reload
	public int reloadEmpty;				// The amount of health the player starts the game with.
	public int reloadLeft;				// The current health the player has.
	public int reloadAdd;				// Reference to the UI's health bar.

	//Recoil
	public int recoilUp;				// Reference to an image to flash on the screen on being hurt.
	public int recoilLeft;				// The audio clip to play when the player dies.
	public int recoilRight;				// The speed the damageImage will fade at.
	public int recoilDown;				// The speed the damageImage will fade at.
	public int recenterSpd;	

	public Rigidbody projectile;
	public enum weaponData;

	Animator anim;						// Reference to the Animator component.
	AudioSource playerAudio;			// Reference to the AudioSource component.
	PlayerMovement playerMovement;		// Reference to the player's movement.
	PlayerShooting playerShooting;		// Reference to the PlayerShooting script.
	Rigidbody playerRigidbody;          // Reference to the player's rigidbody.
	bool isDead;                                                // Whether the player is dead.
	bool damaged;                                               // True when the player gets damaged.
	
	
	void Awake ()
	{

	}
	
	
	void Update ()
	{

	}
	
	
	void FireWeapon (int weaponID)
	{
		/*
		 * Add Accuracy-Spread Math Function, 
		 * Using accuracy filter on bullet-path
		 * Makes a straight line from fire-pointA and pointB
		 * Draw projectile along raycast
		 * if pointB is not Player/Enemy
		 * destroy projectile on ALL collisions (Boundary, Environment, or even Player/Enemy)
		 * Measure Distance/Length of Line
		 * Equation for amount of damage to health
		 * return PlayerHealth.TakeDamage(DamageDealt)
		 */
	}       
}