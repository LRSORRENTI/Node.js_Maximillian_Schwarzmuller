import * as fs from 'fs';

/**
 * Formats each line in a text file by breaking long lines into shorter lines that are no longer than 30 characters.
 * @param filePath The path to the file to be formatted.
 * @returns An array of formatted lines.
 */
const formatLines = (filePath: string): string[] => {
  // Read the file and split its contents into an array of lines.
  const lines: string[] = fs.readFileSync(filePath, 'utf-8').split('\n');

  // Initialize an array to store the formatted lines.
  const formattedLines: string[] = [];

  // Loop through each line in the array of lines.
  for (const line of lines) {
    // If the line is longer than 30 characters, split it into words and format each word into shorter lines.
    if (line.length > 30) {
      const words: string[] = line.split(' ');
      let currentLine: string = words[0];
      for (const word of words.slice(1)) {
        if (currentLine.length + word.length + 1 > 30) {
          formattedLines.push(currentLine);
          currentLine = word;
        } else {
          currentLine += ` ${word}`;
        }
      }
      formattedLines.push(currentLine);
    } else {
      // If the line is shorter than or equal to 30 characters, push it onto the array of formatted lines as-is.
      formattedLines.push(line);
    }
  }

  // Return the array of formatted lines.
  return formattedLines;
};

// Call the formatLines function to format the contents of 'gigantic.txt'.
const formattedLines: string[] = formatLines('gigantic.txt');

// Write the formatted lines to a new file called 'formatted_file.txt'.
fs.writeFileSync('formatted_file.txt', formattedLines.join('\n'), 'utf-8');