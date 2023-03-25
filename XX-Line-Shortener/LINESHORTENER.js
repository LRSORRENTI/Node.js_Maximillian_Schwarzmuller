"use strict";
exports.__esModule = true;
var fs = require("fs");
/**
 * Formats each line in a text file by breaking long lines into shorter lines that are no longer than 30 characters.
 * @param filePath The path to the file to be formatted.
 * @returns An array of formatted lines.
 */
var formatLines = function (filePath) {
    // Read the file and split its contents into an array of lines.
    var lines = fs.readFileSync(filePath, 'utf-8').split('\n');
    // Initialize an array to store the formatted lines.
    var formattedLines = [];
    // Loop through each line in the array of lines.
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        // If the line is longer than 30 characters, split it into words and format each word into shorter lines.
        if (line.length > 30) {
            var words = line.split(' ');
            var currentLine = words[0];
            for (var _a = 0, _b = words.slice(1); _a < _b.length; _a++) {
                var word = _b[_a];
                if (currentLine.length + word.length + 1 > 30) {
                    formattedLines.push(currentLine);
                    currentLine = word;
                }
                else {
                    currentLine += " ".concat(word);
                }
            }
            formattedLines.push(currentLine);
        }
        else {
            // If the line is shorter than or equal to 30 characters, push it onto the array of formatted lines as-is.
            formattedLines.push(line);
        }
    }
    // Return the array of formatted lines.
    return formattedLines;
};
// Call the formatLines function to format the contents of 'gigantic.txt'.
var formattedLines = formatLines('gigantic.txt');
// Write the formatted lines to a new file called 'formatted_file.txt'.
fs.writeFileSync('formatted_file.txt', formattedLines.join('\n'), 'utf-8');
