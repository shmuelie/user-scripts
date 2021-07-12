// ==UserScript==
// @name        SawYouAtSinai Profile Copier
// @namespace   net.englard.shmuelie
// @version     1.0.1
// @description Copies SYAS profile information in a clean manner to clipboard.
// @author      Shmuelie
// @match       https://www.sawyouatsinai.com/members/ViewOthersMProfile.aspx*
// @grant       none
// @website     https://github.com/shmuelie/user-scripts/blob/main/src/SYASProfileCopyer.user.js
// @updateURL   https://raw.githubusercontent.com/shmuelie/user-scripts/main/src/SYASProfileCopyer.user.js
// @supportURL  https://github.com/shmuelie/user-scripts/issues
// @noframes
// ==/UserScript==

(function () {
    function getInnerText(entry) {
        return entry.innerText;
    }

    function extractData(detailsElement) {
        return {
            question: detailsElement.querySelector(".questionText").innerText,
            answer: detailsElement.querySelector(".answrTxt").getAttribute("value"),
            catagory: detailsElement.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector("h4.panel-title").innerText
        };
    }

    function filterUnanswered(details) {
        return details.answer !== null && details.answer !== undefined && details.answer !== "";
    }

    function groupByCatagory(groupedDetails, currentDetails) {
        groupedDetails[currentDetails.catagory] = groupedDetails[currentDetails.catagory] || [];
        groupedDetails[currentDetails.catagory].push({
            question: currentDetails.question,
            answer: currentDetails.answer
        });
        return groupedDetails;
    }

    function copyToClipboard() {
        const topLevelDetails = Array.from(document.querySelectorAll(".profileLeftInfo .sbtitle-text li")).map(getInnerText);
        const secondaryDetails = Array.from(document.querySelectorAll(".profileLeftInfo li.inlineText")).map(getInnerText);
        const profileDetails = Array.from(document.querySelectorAll(".quesstart")).map(extractData).filter(filterUnanswered).reduce(groupByCatagory, {});

        const profile = document.createElement("div");
        {
            const nameHeader = document.createElement("h1");
            nameHeader.textContent = topLevelDetails[0];
            profile.appendChild(nameHeader);
        }
        {
            const topLevelList = document.createElement("ul");
            for (const topLevelItem of topLevelDetails.slice(1)) {
                const topLevelListItem = document.createElement("li");
                topLevelListItem.textContent = topLevelItem;
                topLevelList.appendChild(topLevelListItem);
            }
            for (const secondardItem of secondaryDetails) {
                const secondaryListItem = document.createElement("li");
                secondaryListItem.textContent = secondardItem;
                topLevelList.appendChild(secondaryListItem);
            }
            profile.appendChild(topLevelList);
        }
        for (const catagory of Object.keys(profileDetails)) {
            const section = document.createElement("section");
            {
                const sectionHeader = document.createElement("h2");
                sectionHeader.textContent = catagory;
                section.appendChild(sectionHeader);
            }
            {
                const sectionList = document.createElement("ul");
                for (const item of profileDetails[catagory]) {
                    const listItem = document.createElement("li");
                    listItem.textContent = item.question + " " + item.answer;
                    sectionList.appendChild(listItem);
                }
                section.appendChild(sectionList);
            }
            profile.appendChild(section);
        }

        {
            const blob = new Blob([profile.outerHTML], { type: "text/html" });
            const item = new ClipboardItem({
                "text/html": blob
            });
            const data = [item];
            navigator.clipboard.write(data).then(function() {
                console.log("Copied to clipboard successfully!");
            }, function(e) {
                console.error("Unable to write to clipboard.", e);
            });
        }
    }

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy Profile";
    copyBtn.addEventListener("click", copyToClipboard);
    document.querySelector(".profileLeftInfo").appendChild(copyBtn);
})();