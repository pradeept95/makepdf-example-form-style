import * as pdfFonts from "pdfmake/build/vfs_fonts.js";
import pdfMake from "pdfmake/build/pdfmake"; 
import {
  getTextareaInput,
  getTextInput,
  getSectionHeader,
  pdfStyle,
  getRichTextareaInput,
  getCheckboxInput,
  getRadioInput,
  getCurrencyInput,
  getDateInput,
  getSelectInput,
  getTextInputNoLabel,
} from "./pdf.style";

const testHTML = `<h3>Value in H3 Html Tag</h3><p>first paragraph with <i>Italics</i> <b>Bold<b> and more</p><p>second paragraph</p><p>third paragraph</p>`;

var exampleDocumentDefination: any = {
  content: [
    {
      text: "pdfMake : HTML FORM EXAMPLE",
      style: "header",
    },
    {
      ...getSectionHeader("Two Column Layout"),
    },
    {
      columnGap: 10,
      columns: [
        {
          ...getTextInput(
            "Input type text",
            "This is the value of the text input"
          ),
        },
        {
          ...getCurrencyInput(
            "Currency type example",
            "1,000,000" 
          ),
        },
      ],
    },
    {
      ...getSectionHeader("Three Column Layout"),
    },
    {
      columnGap: 10,
      columns: [
        {
          ...getDateInput(
            "Input type date example",
            new Date()
          ),
        },
        {
          ...getSelectInput(
            "Select input type style",
            "This is the value of the input"
          ),
        },
        {
          ...getTextInputNoLabel(
            "This is example of input with no Label" 
          ),
        },
      ],
    },
    {
      ...getSectionHeader("Single Column Layout/ Textarea Example"),
    },
    {
      columnGap: 10,
      columns: [
        {
          ...getTextareaInput(
            "Some Label (Textarea Example)",
            "This is the value of the input First Label (Input Example) First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)"
          ),
        },
      ],
    },
    {
      ...getSectionHeader("Rich Text Editor Example (Support HTML Tags)"),
    },
    {
      columnGap: 10,
      columns: [
        {
          ...getRichTextareaInput("Rich Text Editor Label", testHTML),
        },
      ],
    },
    {
      ...getSectionHeader("Checkbox and Radio Styles"),
    },
    {
      columnGap: 10,
      columns: [
        {
          ...getCheckboxInput("Checkbox labe with checked checbox", true),
        },
      ],
    },
    {
        columnGap: 10,
        columns: [
          {
            ...getCheckboxInput("Unchecked Checkbox with plain text label", false),
          },
        ],
      },
    {
        columnGap: 10,
        columns: [
          {
            ...getCheckboxInput("Checkbox with html content <br/>" + testHTML, true, "html"),
          },
        ],
      },
      {
        columnGap: 10,
        columns: [
          {
            ...getCheckboxInput( 
              "Checkbox with very long text. This is the value of the input First Label (Input Example) First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)"
            ),
          },
        ],
      },

      //radio button example 
      
      {
        columnGap: 10,
        columns: [
          {
            ...getRadioInput("Radio Example, Horizontal Layout (Default)", [
                {
                    itemLabel : "Option 1",
                    selected : false,
                    width : "auto"
                },
                {
                    itemLabel : "Option 2",
                    selected : true,
                    width : "auto"
                },
                {
                    itemLabel : "Option 3",
                    selected : false,
                    width : "auto"
                }
            ]),
          },
        ],
      },

      {
        columnGap: 10,
        columns: [
          {
            ...getRadioInput("Radio Example, Vertical Layout", [
                {
                    itemLabel : "Option 1",
                    selected : true,
                    width : "auto"
                },
                {
                    itemLabel : "Option 2",
                    selected : false,
                    width : "auto"
                },
                {
                    itemLabel : "Option 3,  Very long text, Checkbox with very long text. This is the value of the input First Label (Input Example) First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)",
                    selected : false,
                    width : "auto"
                }
            ], "vertical"),
          },
        ],
      },
  ],
  styles: pdfStyle,
};

export default function usePDFMake(isLandscape : boolean = false) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  let docDef = exampleDocumentDefination;
  docDef.pageOrientation = isLandscape ? 'landscape' : 'portrait';
  docDef.info = {
	title: 'makePdf Example',
	author: 'Pradeep Raj Thapaliya',
	subject: 'Form type stype',
	keywords: 'makepdf, export pdf',
  },


  pdfMake.createPdf(exampleDocumentDefination).open();
}
