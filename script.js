const tenureYes = document.getElementById("tenure-yes");
const tenureNo = document.getElementById("tenure-no");

const saleYes = document.getElementById("sale-yes");
const saleNo = document.getElementById("sale-no");

const municipality = document.getElementById("municipality");

const sectionA = document.getElementById("section-a");
const sectionB = document.getElementById("section-b");
const sectionC = document.getElementById("section-c");
const form = document.getElementById("form");
const formSectionB = document.getElementById("form-sectionB");
const formSectionC = document.getElementById("form-sectionC");
const resetBtn = document.getElementById("reset");

const selectBox = document.getElementById("selectBox");
const optionsContainer = document.getElementById("optionsContainer");
const selected = document.getElementById("selected");
const optionsList = optionsContainer.querySelectorAll(".option input ");
const specificReservation = document.getElementById("specific-reservations");
const specificReservationLabel = document.getElementById(
  "specific-reservations-label"
);
let selectedOptions = [];

specificReservationLabel.addEventListener("click", () => {
  handleSpecificReservationCheckbox();
});
specificReservation.addEventListener("click", () => {
  handleSpecificReservationCheckbox();
});
// Toggle dropdown

// Update selected options
optionsList.forEach((option) => {
  option.addEventListener(
    "change",
    (e) => {
      console.log(e);
      e.stopPropagation();
      updateSelectedOptions();
    },
    false
  );
});

function updateSelectedOptions() {
  optionsList.forEach((option) => {
    if (selectedOptions.includes(option.value)) {
      selectedOptions = selectedOptions.filter((val) => val !== option.value);
    }
    if (option.checked && !selectedOptions.includes(option.value)) {
      selectedOptions.push(option.value);
    }
  });
  handleSpecificReservationCheckbox();
  selected.textContent =
    selectedOptions.length > 0 ? selectedOptions.join(", ") : "Select options";
}
const handleSpecificReservationCheckbox = function () {
  console.log(selectedOptions);
  if (selectedOptions.length > 0) {
    specificReservation.checked = true;
    return;
  } else specificReservation.checked = false;
};
// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  const multiSelectDropdown = document.querySelector(".multi-select-dropdown");
  const optionsContainer = document.querySelector("#optionsContainer");

  console.log("multiselect dropdown", multiSelectDropdown);
  console.log(
    "something here",
    !multiSelectDropdown.contains(event.target),
    optionsContainer.style.display === "block"
  );

  if (
    !multiSelectDropdown.contains(event.target) &&
    optionsContainer.style.display === "block" &&
    event.target.tagName !== "INPUT" &&
    !event.target.classList.contains("option")
  ) {
    optionsContainer.style.display = "none";
  }
});

selectBox.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("clicked", optionsContainer.style.display);
  if (
    optionsContainer.style.display === "block" &&
    e.target.tagName !== "INPUT" &&
    !e.target.classList.contains("option")
  )
    optionsContainer.style.display = "none";
  else optionsContainer.style.display = "block";
  handleSpecificReservationCheckbox();
});

const handleTooltip = function () {
  const allInfos = document.querySelectorAll("#info");
  allInfos.forEach((info) => {
    info.addEventListener("mouseenter", (e) => {
      info.nextElementSibling.classList.add("show");
      info.nextElementSibling.classList.remove("hide");
    });
    info.addEventListener("mouseleave", (e) => {
      info.nextElementSibling.classList.add("hide");
      info.nextElementSibling.classList.remove("show");
    });
  });
};
tenureYes.addEventListener("change", (e) => {
  if (e.target.checked) {
    renderFormSection("B");
    handleTooltip();
  }
});

resetBtn.addEventListener("click", () => {
  document.querySelectorAll("input").forEach((input) => {
    input.target.value = "";
  });
  selectedOptions = [];
  updateSelectedOptions();
});

tenureNo.addEventListener("change", (e) => {
  if (e.target.checked) {
  }
});
saleYes.addEventListener("change", (e) => {
  if (e.target.checked) {
    municipality.insertAdjacentHTML(
      "beforeend",
      'Is it within a municipality? <div class="radio-group"> <input type="radio" name="municipality" id="municipality-yes" /><label for="municipality-yes">Yes</label><input type="radio" name="municipality" id="municipality-no" /> <label for="municipality-no">No</label> </div>'
    );

    const municipalityNo = document.getElementById("municipality-no");
    const municipalityYes = document.getElementById("municipality-yes");
    municipalityNo.addEventListener("change", (e) => {
      if (e.target.checked) {
        console.log("render c");

        renderFormSection("C");
        handleTooltip();
      }
    });
    municipalityYes.addEventListener("change", (e) => {
      if (e.target.checked) {
      }
    });
  }
});
saleNo.addEventListener("change", (e) => {
  if (e.target.checked) {
    municipality.innerHTML = "";
  }
});

const renderFormSection = function (sectionName) {
  if (sectionName === "B") {
    formSectionB.insertAdjacentHTML(
      "afterbegin",
      '<h3> Section B: Cancellation of Lease or Issuance of Letters Patent (AKA  Enlargement)</h3>   <div class=" grid col-2 gap">       <div class="form-group">           <label for="document-reference-type"> <div class="label-with-icon"><div>Document Reference Type </div><div class="info-wrapper"> <div id="info">i</div><div class="hide">From the dropdown select proper document type          </div> </div></div> </label>           <select id="document-reference-type">               <option value="Summer Resort Lease (SRL)">                   Summer Resort Lease (SRL)               </option><option value="Crown Lease (CRL)">                   Crown Lease (CRL)               </option>           </select>       </div>       <div class="form-group">           <label for="document-number"><div class="label-with-icon"><div>Document No </div><div class="info-wrapper"><div id="info">i</div><div class="hide">  Insert the document number</div>  </div></div></label><input type="text" id="document-number" />  </div>   </div>  <div class="line"></div>  <div class="form-flex">      <div class="form-group">     <label for="expiry-date">   <div class="label-with-icon"><div>Expiry Date </div><div class="info-wrapper">          <div id="info">i</div>          <div class="hide">         Insert an expiry date of the lease that is being cancelled          </div>        </div>      </div>   </label>     <input type="date" id="expiry-date" />   </div>   <div class="form-group">       <label for="annual-rent">      <div class="label-with-icon">        <div>        Annual Rent                            </div>                <div class="info-wrapper">          <div id="info">i</div>          <div class="hide">Insert the most recent rent amount the lease was paying          </div>        </div>      </div>        </label>       <input type="number" id="annual-rent" />   </div>   <div class="form-group">       <label for="paid-to">            <div class="label-with-icon"><div>Paid To    </div><div class="info-wrapper">  <div id="info">i</div>  <div class="hide">Insert the month and year of which the lease made the last payment </div></div></div>        </label>       <input type="text" id="paid-to" />   </div>     </div>   <div class="line"></div>   <div class="form-group">     <label for="current-lease-name">        <div class="label-with-icon"><div>          Current Lease Names    </div><div class="info-wrapper">  <div id="info">i</div><div class="hide">Insert owners name as shown on the leasehold PIN    </div></div></div>        </label>     <textarea type="text" id="current-lease-name" ></textarea>   </div>  <div class="line"></div>   <div class="form-group"><label for="property-description"       >Property Description as found on leasehold P.I.N</label     >     <input type="text" id="property-description" />       </div>      <div class="line"></div><div class="grid col-2 gap">      <div class="form-group">          <label for="leasehold-pin-number">          <div class="label-with-icon"><div>          Leasehold P.I.N No  </div><div class="info-wrapper"><div id="info">i</div>  <div class="hide">If applicable enter subject property identifier number</div></div></div></label>    <input type="number" id="leasehold-pin-number" />  </div>  <div class="form-group">  <label for="unused-funds"><div class="label-with-icon"><div>Disposition of Unused Funds</div><div class="info-wrapper">  <div id="info">i</div>  <div class="hide">If the "enlargement"  is to take place part way through the rental year then an exploration of how "unused" part of the annual  has been addressed must be entered. If the credit towards the purchase price or the refund has been/will be given to client, this must be entered. If no credit has been/will be provided then enter absorb. If the "enlargement" is to coincide with the anniversary date or expiry dat e of the lease, enter "n/a"     </div></div></div>          </label>    <input type="number" id="unused-funds" />  </div>  </div>  <div class="line"></div>  <h3><i>Crown Land Registry Use Only:</i> </h3>  <div class="bg"> <div class="grid col-2 gap">      <div class="form-group">  <label for="document-general-number">Document General Number</label>  <input type="number" id="document-general-number" />      </div>      <div class="form-group">   <label for="date">Date</label>          <input type="date" id="date" />      </div>  </div>  <div class="form-group">    <label for="notes">Notes</label><textarea id="notes"></textarea></div></div>'
    );
  }
  if (sectionName === "C") {
    formSectionC.insertAdjacentHTML(
      "afterbegin",
      '  <div>Sections 55.1 (1) and 55.1 (3) Public Lands Act, R.S.O. 1990, as amended </div>  <div class="line"></div><h3>Section C: Minister’s Order</h3><div class="line"></div><div>    <p>Road description to be put in by Crown or Road Allowance laid out        by a Crown Surveyor that <u>that is not within a municipality</u></p>        <div class="form-group">        <label for="road-description"      ><div class="label-with-icon">      <div>        Legal Description of Road Allowance                      </div>            <div class="info-wrapper">        <div id="info">i</div>        <div class="hide">Insert legal description of road allowance obtained from OSG. At a minimum include, Include the Crown Location or Mining Location Number, Parts and Deposited No. (ex: CL12345, Parts 1-3, 45R99999)           </div>      </div>    </div>      </label    >    <input type="text" id="road-description" />    <div class="line" ></div>  </div>  <div class="form-group">    <label for="road-closure-notice"      >        <div class="label-with-icon"><div>        Has appropriate notice been given to persons who will be affected      by the road closure?    </div><div class="info-wrapper">  <div id="info">i</div>  <div class="hide">Confirm that proper notice has been given. if you enter "no", the requisition package will be  returned to the file lead</div></div></div></label>    <div class="radio-group">      <input        type="radio"        name="road-closure-notice"        id="road-closure-yes"      />      <label for="road-closure-yes">Yes</label>       <input         type="radio"         name="road-closure-notice"         id="road-closure-no"       />       <label for="road-closure-no">No</label>     </div>   </div>   <h3><i>Crown Land Registry Use Only</i></h3>   <div class="bg">   <div class="grid col-2 gap">   <div class="form-group">   <label>Approved</label>    <div class="line" style="margin: 40px 0 0 0 ;"></div>    <label for="legal-description-road"    >    <div       Provincial Lands Specialist   </div>   <div       Crown Land Registry      </div></label   >    </div>    <div class="form-group">        <label for="date-minister-order">Date</label>        <input type="date" id="date-minister-order" />      </div>    <div class="form-group">      <label for="minister-order-number">Minister\'s Order Number</label>      <input type="text" id="minister-order-number" /> </div>    <div class="form-group">      <label for="date-minister-order">Date</label>      <input type="date" id="date-minister-order" />    </div></div>    <div class="form-group">      <label for="minister-notes">Notes</label>      <textarea id="minister-notes"></textarea>    </div>    </div>'
    );
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {};

  // Function to capitalize the first letter of a string

  // Assign values to data object with modified keys
  data["Requisition"] = capitalizeFirstLetter(
    document.getElementById("requisition").value
  );
  data["Legal Names"] = capitalizeFirstLetter(
    document.getElementById("legal-names").value
  );
  data["Operating Names"] = capitalizeFirstLetter(
    document.getElementById("operating-names").value
  );
  data["Jurisdiction"] = capitalizeFirstLetter(
    document.getElementById("jurisdiction").value
  );
  data["Tenancy"] = capitalizeFirstLetter(
    document.getElementById("tenancy").value
  );
  data["Other Tenancy"] = capitalizeFirstLetter(
    document.getElementById("other-tenancy").value
  );
  data["Other Tenancy Text"] = capitalizeFirstLetter(
    document.getElementById("other-tenancy-text").value
  );
  data["Sales Price"] = capitalizeFirstLetter(
    document.getElementById("sale-price").value
  );
  data["Was HST Collected"] = capitalizeFirstLetter(
    document.getElementById("hst-collected").value
  );
  data["HST"] = capitalizeFirstLetter(document.getElementById("hst").value);
  data["Patent Fee"] = capitalizeFirstLetter(
    document.getElementById("patent-fee").value
  );
  data["Market Value"] = capitalizeFirstLetter(
    document.getElementById("market-value").value
  );
  data["Sale Condition"] = capitalizeFirstLetter(
    document.getElementById("sale-conditions").value
  );
  data["Condition Date"] = capitalizeFirstLetter(
    document.getElementById("conditions-date").value
  );
  data["Purpose"] = capitalizeFirstLetter(
    document.getElementById("purpose").value
  );
  data["Legal Description"] = capitalizeFirstLetter(
    document.getElementById("legal-description").value
  );
  data["Standard"] = document.getElementById("standard").checked ? "Yes" : "No";
  data["Specific Reservations"] = document.getElementById(
    "specific-reservations"
  ).checked
    ? selectedOptions.join(",")
    : "No";
  data["Easement Number"] = capitalizeFirstLetter(
    document.getElementById("easement-number").value
  );
  data["Guarantee"] = capitalizeFirstLetter(
    document.getElementById("grantee").value
  );
  data["Easement Purpose"] = capitalizeFirstLetter(
    document.getElementById("easement-purpose").value
  );
  data["Instrument Number"] = capitalizeFirstLetter(
    document.getElementById("instrument-number").value
  );
  data["Legal Description 2"] = capitalizeFirstLetter(
    document.getElementById("legal-description-textarea").value
  );
  data["Special Conditions"] = capitalizeFirstLetter(
    document.getElementById("special-conditions").value
  );
  data["Legal Description Schedule"] = document.getElementById(
    "legal-description-schedule"
  ).checked
    ? "Yes"
    : "No";
  data["Current PIN Instruments"] = document.getElementById(
    "current-pin-instruments"
  ).checked
    ? "Yes"
    : "No";
  data["Corporate Profile"] = document.getElementById("corporate-profile")
    .checked
    ? "Yes"
    : "No";
  data["OIC Briefing Notes"] = document.getElementById("oic-briefing-notes")
    .checked
    ? "Yes"
    : "No";
  data["Lease Cancelled"] = document.getElementById("lease-cancelled").checked
    ? "Yes"
    : "No";
  data["Legal Approval"] = document.getElementById("legal-approval").checked
    ? "Yes"
    : "No";
  data["Plan"] = document.getElementById("plan").checked ? "Yes" : "No";
  data["Other Easement"] = document.getElementById("other").checked
    ? "Yes"
    : "No";
  data["Other Easement Text"] = capitalizeFirstLetter(
    document.getElementById("other-text").value
  );
  data["Document Reference 1"] = capitalizeFirstLetter(
    document.getElementById("document-reference-1").value
  );
  data["Document Reference 2"] = capitalizeFirstLetter(
    document.getElementById("document-reference-2").value
  );
  data["Document Reference 3"] = capitalizeFirstLetter(
    document.getElementById("document-reference-3").value
  );
  data["Date 1"] = capitalizeFirstLetter(
    document.getElementById("date-1").value
  );
  data["Date 2"] = capitalizeFirstLetter(
    document.getElementById("date-2").value
  );
  data["Date 3"] = capitalizeFirstLetter(
    document.getElementById("date-3").value
  );
  data["Land File Number"] = capitalizeFirstLetter(
    document.getElementById("land-file-number").value
  );

  if (document.getElementById("tenure-yes")?.checked) {
    data["Document Reference Type"] = capitalizeFirstLetter(
      document.getElementById("document-reference-type").value
    );
    data["Document Number"] = capitalizeFirstLetter(
      document.getElementById("document-number").value
    );
    data["Expiry Date"] = capitalizeFirstLetter(
      document.getElementById("expiry-date").value
    );
    data["Annual Rent"] = capitalizeFirstLetter(
      document.getElementById("annual-rent").value
    );
    data["Paid To"] = capitalizeFirstLetter(
      document.getElementById("paid-to").value
    );
    data["Current Lease Name"] = capitalizeFirstLetter(
      document.getElementById("current-lease-name").value
    );
    data["Property Description"] = capitalizeFirstLetter(
      document.getElementById("property-description").value
    );
    data["Leasehold PIN Number"] = capitalizeFirstLetter(
      document.getElementById("leasehold-pin-number").value
    );
    data["Unused Funds"] = capitalizeFirstLetter(
      document.getElementById("unused-funds").value
    );
    data["Document General Number"] = capitalizeFirstLetter(
      document.getElementById("document-general-number").value
    );
    data["Date"] = capitalizeFirstLetter(document.getElementById("date").value);
    data["Notes"] = capitalizeFirstLetter(
      document.getElementById("notes").value
    );
  }

  if (document.getElementById("municipality-no")?.checked) {
    data["Road Description"] = capitalizeFirstLetter(
      document.getElementById("road-description").value
    );
    data["Road Closure Yes"] = document.getElementById("road-closure-yes")
      .checked
      ? "Yes"
      : "No";
    data["Road Closure No"] = document.getElementById("road-closure-no").checked
      ? "Yes"
      : "No";
    data["Date Minister Order"] = capitalizeFirstLetter(
      document.getElementById("date-minister-order").value
    );
    data["Minister Order Number"] = capitalizeFirstLetter(
      document.getElementById("minister-order-number").value
    );
    data["Minister Notes"] = capitalizeFirstLetter(
      document.getElementById("minister-notes").value
    );
  }

  // Function to capitalize first letter of each word in a string
  // sendEmail(data);
  generatePDF(data);
});
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to generate PDF and return it as a base64 string
const generatePDF = function (data) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let yPos = 20; // Initial Y position for content
  const lineHeight = 10; // Height of each line

  Object.entries(data).forEach(([key, value]) => {
    const text = `${key}: ${value}`;
    const textLines = doc.splitTextToSize(
      text,
      doc.internal.pageSize.width - 20
    ); // Adjust width as needed

    // Check if the text fits on the current page
    if (
      yPos + textLines.length * lineHeight >
      doc.internal.pageSize.height - 20
    ) {
      // Add new page if content exceeds the page height
      doc.addPage();
      yPos = 20; // Reset Y position for new page
    }

    // Output text lines
    textLines.forEach((line) => {
      doc.text(line, 10, yPos);
      yPos += lineHeight; // Increment Y position for the next line
    });
  });

  doc.save("document.pdf");
};

// // Function to send email with PDF attachment
// const sendEmail = async function (data) {
//   const message = Object.entries(data)
//     .map(([key, value]) => {
//       return `${key}: ${value}`;
//     })
//     .join("\n");
//   const params = {
//     name: "IDRIS",
//     email: "hedristemitope2001@gmail.com",
//     message: message,
//   };

//   // Generate the PDF and convert to Blob
//   //   const pdfBlob = await generatePDF(data);

//   // Convert the Blob to a Base64 string
//   //   const pdfBase64 = await convertBlobToBase64(pdfBlob);

//   // Prepare the attachment object for EmailJS

//   emailjs
//     .send("service_4e86o6x", "template_2xpyi8b", params)
//     .then(() => {
//       alert("sent");
//     })
//     .catch((error) => {
//       console.error("Failed to send email:", error);
//     });
// };

// Example usage
//   sendEmail();

// Example usage
//   sendEmail();
// const convertBlobToBase64 = (blob) => {
//   return new Promise((resolve, reject) => {
//     console.log(blob);
//     const reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onloadend = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// };

handleTooltip();
