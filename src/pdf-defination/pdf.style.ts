import htmlToPdfmake from "html-to-pdfmake";
import {
  calendarButtonIcon,
  dropdownButtonIcon,
  checkedRadioButtonIcon,
  uncheckedRadioButtonIcon,
  checkedCheckboxButtonIcon,
  uncheckedCheckboxButtonIcon,
} from "./icons.default";

export const pdfStyle = {
  header: {
    fontSize: 18,
    bold: true,
    alignment: "center",
  },
  subheader: {
    fontSize: 15,
    bold: true,
  },
  quote: {
    italics: true,
  },
  small: {
    fontSize: 8,
  },
  // defination of form elment
  sectionHeaderStyle: {
    bold: true,
    italics: false,
    fontSize: 12,
    alignment: "center",
    margin: [0, 6, 0, 4],
    color: "white",
    fillColor: "#063837",
  },
  labelStyle: {
    bold: true,
    italics: true,
    fontSize: 11,
    color: "black",
    margin: [0, 6, 0, 3],
  },
  textInputStyle: {
    fontSize: 10,
    italics: true,
    color: "#282828",
    fillColor: "#f2f2f2",
  },
  textareaStyle: {
    fontSize: 10,
    italics: true,
    color: "#282828",
    fillColor: "#f2f2f2",
  },
  richTextEditorStyle: {
    fontSize: 10,
    color: "#282828",
    fillColor: "#f2f2f2",
  },
  dropdownStyle: {},
  checkboxStyle: {},
  radioStyle: {},
};

export function getSectionHeader(headerText: string) {
  return {
    stack: [
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: headerText,
              },
            ],
          ],
        },
        style: "sectionHeaderStyle",
      },
    ],
  };
}

export function getTextInput(label: string, value: string | undefined) {
  return {
    stack: [
      {
        text: label,
        style: "labelStyle",
      },
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: value,
              },
            ],
          ],
        },
        style: "textInputStyle",
      },
    ],
  };
}

export function getTextInputNoLabel(value: string | undefined) {
    return {
      stack: [ 
        {
          table: {
            widths: ["*"],
            body: [
              [
                {
                  text: value,
                },
              ],
            ],
          },
          style: "textInputStyle",
        },
      ],
    };
  }

export function getDateInput(label: string, value: Date | undefined) {
  return {
    stack: [
      {
        text: label,
        style: "labelStyle",
      },
      {
        table: {
          widths: ["*", 10],
          body: [
            [
              {
                text: value ? value.toLocaleDateString() : "",
              },
              {
                image: calendarButtonIcon,
                width: 10,
              },
            ],
          ],
        },
        style: "textInputStyle",
      },
    ],
  };
}

export function getSelectInput(label: string, value: String | undefined) {
  return {
    stack: [
      {
        text: label,
        style: "labelStyle",
      },
      {
        table: {
          widths: ["*", 10],
          body: [
            [
              {
                text: value,
              },
              {
                image: dropdownButtonIcon,
                width: 10,
              },
            ],
          ],
        },
        style: "textInputStyle",
      },
    ],
  };
}

export function getCurrencyInput(
  label: string,
  value: number | string | undefined,
  currencySymbol: string = "$",
  setCurrencSymbolyAsPrefix: boolean = true
) {
  return {
    stack: [
      {
        text: label,
        style: "labelStyle",
      },
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: setCurrencSymbolyAsPrefix
                  ? `${currencySymbol}${value}`
                  : `${value} ${currencySymbol}`,
              },
            ],
          ],
        },
        style: "textInputStyle",
      },
    ],
  };
}

/// For Larger Text
export function getTextareaInput(label: string, value: string | undefined) {
  return {
    stack: [
      {
        text: label,
        style: "labelStyle",
      },
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: value,
              },
            ],
          ],
        },
        style: "textareaStyle",
      },
    ],
  };
}

/// For Larger Text with html tags
export function getRichTextareaInput(label: string, value: string | undefined) {
  return {
    stack: [
      {
        text: label,
        style: "labelStyle",
      },
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                stack: htmlToPdfmake(value as string),
              },
            ],
          ],
        },
        style: "richTextEditorStyle",
      },
    ],
  };
}

/// radio button input
export function getRadioInput(
  label: string,
  options: {
    itemLabel: string;
    selected: boolean;
    width: number | string | undefined;
  }[],
  optionLayout: "vertical" | "horizontal" = "horizontal"
) {
  //create basic layout
  let labelOptions: any = {
    columnGap: 5,
    style: "richTextEditorStyle",
  };

  if (optionLayout === "horizontal") {
    const layout2D = options?.map((option) => {
      return [
        {
          width: 15,
          image: option.selected
            ? checkedRadioButtonIcon
            : uncheckedRadioButtonIcon,
        },
        {
          width: option.width ?? "auto",
          text: option.itemLabel,
          fontSize: 10,
          italics: true,
        },
      ];
    });

    // flattened column
    const columns = [];
    for (let option of layout2D)
      for (let labelOrIcon of option) columns.push(labelOrIcon);

    //set radio options to labelOption
    labelOptions["columns"] = columns;
  } else {
    labelOptions["stack"] = options?.map((option) => {
      return {
        columnGap: 5,
        columns: [
          {
            width: 15,
            image: option.selected
              ? checkedRadioButtonIcon
              : uncheckedRadioButtonIcon,
          },
          {
            width: option.width ?? "auto",
            text: option.itemLabel,
            fontSize: 10,
            italics: true,
          },
        ],
      };
    });
  }

  return {
    stack: [
      {
        text: label,
        style: "labelStyle",
      },
      labelOptions,
    ],
  };
}

// checkbox input
export function getCheckboxInput(
  label: string | undefined,
  ischecked: boolean = false,
  labelContentType: "plaintext" | "html" = "plaintext"
) {
  return {
    columnGap: 5,
    columns: [
      {
        width: 15,
        image: ischecked
          ? checkedCheckboxButtonIcon
          : uncheckedCheckboxButtonIcon,
      },
      {
        width: "auto",
        stack:
          labelContentType === "html"
            ? htmlToPdfmake(label as string)
            : [label],
        fontSize: 10,
        italics: true,
      },
    ],
  };
}
