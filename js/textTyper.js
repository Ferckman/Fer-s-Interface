export class TextTyper {
  constructor(audioPath, volume = 0.5) {
    this.audio = new Audio(audioPath);
    this.audio.volume = volume;
  }

  type({ element, text, speed = 40, onFinish }) {
    let index = 0;

    const typeChar = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        this.audio.currentTime = 0;
        this.audio.play();
        setTimeout(typeChar, speed);
      } else {
        this.audio.pause();
        this.audio.currentTime = 0;
        if (onFinish) onFinish();
      }
    };

    typeChar();
  }
}