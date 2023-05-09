class Progress {
    constructor(elId, percent) {
      this.status = true;

      if (percent < 0 || percent == undefined || percent > 100 || percent == null
          || !Number.isInteger(percent)){
        this.value = 0;
        console.log("Incorrect percent, value is", percent);
      } else {
        this.value = percent;
      }
  
      this.root = document.getElementById(elId);
      this.root.classList.add("progress-container");
  
      this.createProgressElements();
      this.appendProgressElements();
      this.initializeProgressElements();
  
      this.setValue(this.value);
    }
  
    createProgressElements() {
      this.progressInputValue = this.createInputValueElement();
      this.progressToggleAnimate = this.createToggleAnimateElement();
      this.progressToggleHide = this.createToggleHideElement();
      this.progressBar = this.createProgressBarElement();
    }
  
    createInputValueElement() {
      const el = document.createElement("div");
      el.className = "progress-settings__frame__input";
      el.innerHTML = `
        <label class="input-value">
            <input type="number" class="percent"
                   placeholder="0" min="0" max="100" step="1";"
            >
        </label>
        <p>Value</p>
      `;
      return el;
    }
  
    createToggleAnimateElement() {
      const el = document.createElement("div");
      el.className = "progress-settings__frame__input";
      el.innerHTML = `
        <label class="switch">
            <input type="checkbox" class="animate">
            <span class="slider-button round"></span>
        </label>
        <p>Animate</p>
      `;
      return el;
    }
  
    createToggleHideElement() {
      const el = document.createElement("div");
      el.className = "progress-settings__frame__input";
      el.innerHTML = `
        <label class="switch">
            <input type="checkbox" class="hide">
            <span class="slider-button round"></span>
        </label>
        <p>Hide</p>
      `;
      return el;
    }
  
    createProgressBarElement() {
      const el = document.createElement("div");
      el.className = "progress-bar";
      el.innerHTML = `
        <svg class="progress-ring" width="150" height="150">
            <circle stroke="#EEF3F6" stroke-width="13"
                    cx="50%" cy="50%" r="67" fill="transparent"
            />
            <circle class="progress-ring__circle_filled"
                    stroke="#005BFF" stroke-width="13"
                    cx="50%" cy="50%" r="67" fill="transparent"
            />
        </svg>
      `;
      return el;
    }
  
    appendProgressElements() {
      const header = document.createElement("p");
      const settings = document.createElement("div");
      const settings__frame = document.createElement("div");
  
      settings.className = "progress-settings";
      settings__frame.className = "progress-settings__frame";
      header.textContent = "Progress";
  
      settings__frame.appendChild(this.progressInputValue);
      settings__frame.appendChild(this.progressToggleAnimate);
      settings__frame.appendChild(this.progressToggleHide);
      settings.appendChild(settings__frame);
  
      this.root.appendChild(header);
      this.root.appendChild(this.progressBar);
      this.root.appendChild(settings);
    }
  
    initializeProgressElements() {
      this.progressRing = this.root.querySelector(".progress-ring");
      this.circle = this.progressRing.querySelector(".progress-ring__circle_filled");
  
      this.radius = this.circle.r.baseVal.value;
      this.circumference = 2 * Math.PI * this.radius;
  
      this.inputValue = this.root.querySelector(".percent");
      this.inputAnimate = this.root.querySelector(".animate");
      this.inputHide = this.root.querySelector(".hide");
  
      this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
      this.circle.style.strokeDashoffset = this.circumference;
  
      this.inputValue.addEventListener("input", (event) => {
        this.setValue(event.target.value);
      });
  
      this.inputAnimate.addEventListener("change", (event) => {
        if (event.target.checked) {
          this.animateOn();
        } else {
          this.animateOff();
        }
      });
  
      this.inputHide.addEventListener("change", (event) => {
        if (event.target.checked) {
          this.hideOn();
        } else {
          this.hideOff();
        }
      });
    }
  
    promise() {
        return new Promise((res) => this.time = setTimeout(res, 400));
    }

    async valueToAnimation(value) {
        this.value = value;
      
        while (this.status) {
          this.value += 10;
      
          if (this.value >= 100) {
            if (this.value === 100) {
              clearTimeout(this.time);
            } else if (this.value >= 101) {
              this.value = 0;
            }
          }
          this.animateCircle(this.value);
          await this.promise();
        }
      }

    animateCircle(value){
        const offset = this.circumference - value / 100 * this.circumference;
        this.circle.style.strokeDashoffset = offset;
    }

    getValue() {
        return this.inputValue.value;
    }

    setValue(percent) {
        if (percent > 100) {
            percent = 100;
        }
        else if (percent < 0) {
            percent = 0;
        }
        this.inputValue.value = percent;

        const offset = this.circumference - percent / 100 * this.circumference;
        this.circle.style.strokeDashoffset = offset;
    }

    animateOn() {
        this.status = true;
        this.valueToAnimation(this.value);
        this.inputAnimate.checked = true;
        this.inputValue.disabled = true;
    }

    animateOff() {
        clearTimeout(this.time);
        this.inputAnimate.checked = false;
        this.inputValue.disabled = false;
        this.status = false;
        this.value = 0;
        this.animateCircle(this.value);
    }

    isAnimated() {
        return this.inputAnimate.checked;
    }

    hideOn() {
        this.progressRing.classList.add("progress-ring--hide");
        this.inputHide.checked = true;
    }

    hideOff() {
        this.progressRing.classList.remove("progress-ring--hide");
        this.inputHide.checked = false;
    }

    isHidden() {
        return this.inputHide.checked;
    }
  }
  
  export default Progress;