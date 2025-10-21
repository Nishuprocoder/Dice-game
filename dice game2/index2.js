// index.js - Turn-based Dicee (corrected)
'use strict';

let randomNumber1 = 6; // initial left die
let randomNumber2 = 6; // initial right die
let turn = 1;          // 1 = Player 1, 2 = Player 2

function rollCurrentPlayer() {
    console.log("🔥 Button clicked! Current turn:", turn, "| Current numbers:", randomNumber1, "-", randomNumber2);

    // Ensure button exists (defensive)
    const rollButton = document.getElementById("rollButton");
    const statusH1 = document.querySelector("h1");

    if (!rollButton || !statusH1) {
        console.error("Required DOM elements missing (#rollButton or <h1>).");
        return;
    }

    if (turn === 1) {
        // Player 1 rolls -> update left die
        randomNumber1 = Math.floor(Math.random() * 6) + 1;
        console.log("🎲 Player 1 rolled:", randomNumber1);

        const img1 = document.querySelector(".img1");
        if (img1) {
            img1.setAttribute("src", `./images/dice${randomNumber1}.png`);
            img1.alt = `Player 1 rolled ${randomNumber1}`;
            console.log("✅ Player 1 image updated to:", img1.src);
        } else {
            console.error("❌ .img1 not found in DOM!");
        }

        // switch turn to player 2
        turn = 2;
        rollButton.textContent = "Roll: Player 2";
        statusH1.textContent = "Player 2's Turn";

    } else {
        // Player 2 rolls -> update right die
        randomNumber2 = Math.floor(Math.random() * 6) + 1;
        console.log("🎲 Player 2 rolled:", randomNumber2);

        const img2 = document.querySelector(".img2");
        if (img2) {
            img2.setAttribute("src", `./images/dice${randomNumber2}.png`);
            img2.alt = `Player 2 rolled ${randomNumber2}`;
            console.log("✅ Player 2 image updated to:", img2.src);
        } else {
            console.error("❌ .img2 not found in DOM!");
        }

        // Decide winner and show result
        if (randomNumber1 > randomNumber2) {
            statusH1.textContent = "🚩 Player 1 Wins!";
            console.log("🏆 Player 1 wins!");
        } else if (randomNumber2 > randomNumber1) {
            statusH1.textContent = "Player 2 Wins! 🚩";
            console.log("🏆 Player 2 wins!");
        } else {
            statusH1.textContent = "Draw! 🎲";
            console.log("🤝 It's a draw!");
        }

        // Reset for next round: back to Player 1
        turn = 1;
        rollButton.textContent = "Roll: Player 1";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    console.log("🚀 Page loaded! Initial setup: Numbers =", randomNumber1, "-", randomNumber2, "| Turn =", turn);

    const button = document.getElementById("rollButton");
    const statusH1 = document.querySelector("h1");
    const img1 = document.querySelector(".img1");
    const img2 = document.querySelector(".img2");

    if (!button) {
        console.error("❌ Button (#rollButton) not found! Add <button id='rollButton'> to HTML.");
        return;
    }

    // Attach listener
    button.addEventListener('click', rollCurrentPlayer);
    button.textContent = "Roll: Player 1"; // initial button label

    // Safe initialization of header and images
    if (statusH1) statusH1.textContent = "Player 1's Turn";
    if (img1) {
        img1.setAttribute("src", `./images/dice${randomNumber1}.png`);
        img1.alt = `Player 1 initial ${randomNumber1}`;
    }
    if (img2) {
        img2.setAttribute("src", `./images/dice${randomNumber2}.png`);
        img2.alt = `Player 2 initial ${randomNumber2}`;
    }

    console.log("✅ Button listener attached and initial images set.");
});
