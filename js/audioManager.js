export const clickSound = new Audio("audio/click.mp3");
export const openSound = new Audio("audio/open.mp3");

export function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}