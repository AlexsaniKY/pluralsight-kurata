
//from https://stackoverflow.com/questions/1222045/how-to-loop-all-the-elements-that-match-the-regex
export function* regexMatches(regex: RegExp, targetText: string){
    let result: RegExpExecArray;
    while((result = regex.exec(targetText)) !== null) yield result[0];
}