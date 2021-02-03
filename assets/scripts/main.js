// main.js

/* --------------------------------------------------------------------------*/

// Application state, set to initial values
let app_state = {
    volume_level: 100,
    horn_aud_src: "./assets/media/audio/air-horn.mp3",
    horn_img_src: "./assets/media/images/air-horn.svg",
};

/* --------------------------------------------------------------------------*/
// Volume

let vol_slider = document.getElementById("volume-slider");
let vol_number = document.getElementById("volume-number");
let vol_icon   = document.getElementById("volume-image");

// Volume actions
vol_slider.addEventListener("input", () => {
    let i = vol_slider.value;
    vol_number.value = i;
    update_volume_level(i);
}, false);

vol_number.addEventListener("input", () => {
    let i = vol_number.value;
    vol_slider.value = i;
    update_volume_level(i);
}, false);

// Mutator
function update_volume_level(volume) {
    if (volume > 100 || volume < 0) {
        console.log("Volume is out of bounds.");
    } else {
        // Update the volume correspondingly
        app_state.volume_level = volume;
        audio.volume = (volume) / 100;

        // Update the graphic and the button
        if (volume == 0) {
            vol_icon.src = "./assets/media/icons/volume-level-0.svg"; 
            honk_btn.disabled = true;
        }
        else {
            honk_btn.disabled = false;
            if (volume < 33) { vol_icon.src = "./assets/media/icons/volume-level-1.svg"; }
            else if (volume < 66) { vol_icon.src = "./assets/media/icons/volume-level-2.svg"; }
            else { vol_icon.src = "./assets/media/icons/volume-level-3.svg"; }
        }
    }
}

/* --------------------------------------------------------------------------*/
// Sound

let sound_img = document.getElementById("sound-image");
let audio     = document.getElementById("horn-sound");
let air_s_btn = document.getElementById("radio-air-horn");
let car_s_btn = document.getElementById("radio-car-horn");
let par_s_btn = document.getElementById("radio-party-horn");
let honk_btn  = document.getElementById("honk-btn");

air_s_btn.addEventListener("click", () => {
    update_horn_aud_src("./assets/media/audio/air-horn.mp3");
    update_horn_img_src("./assets/media/images/air-horn.svg");
}, false);

car_s_btn.addEventListener("click", () => {
    update_horn_aud_src("./assets/media/audio/car-horn.mp3");
    update_horn_img_src("./assets/media/images/car.svg");
}, false);

par_s_btn.addEventListener("click", () => {
    update_horn_aud_src("./assets/media/audio/party-horn.mp3");
    update_horn_img_src("./assets/media/images/party-horn.svg");
}, false);

honk_btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    audio.play();
    return false;
}, true);

// Mutators
function update_horn_img_src(src_path) {
    app_state.horn_img_src = src_path;
    sound_img.src = src_path;
    
}

function update_horn_aud_src(src_path) {
    app_state.horn_aud_src = src_path;
    audio.src = src_path;
}
