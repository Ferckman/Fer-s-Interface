export const clickSound = new Audio("audios/click.mp3");
export const openSound = new Audio("audios/open.mp3");

export function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
