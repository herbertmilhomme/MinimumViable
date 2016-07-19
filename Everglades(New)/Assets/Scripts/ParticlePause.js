#pragma strict

private var particles : ParticleSystem;

function Update () 
{
	particles = GetComponent(ParticleSystem);
	particles.Pause();
}

