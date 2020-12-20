


/*Given String str = “aabbccdddfffggghhhiiiiiaaaaaammmmmmmmxxxyyyzzz”

Find largest consecutive Char name, count and start Index of it
If you find the same count for more than one Char. Return smallest index Char.
In the given Example Char name= m, Count= 8  Start index = 28

*/
let s = str.split('');

let temp = s[0];
let count1= 1, count2= 0;

for(let i=1;i<s.length;i++) {

	if(str[i] != str [i+1])
		count2++;
	else
		count1++;
	count1= Math.min(count1, count2);
	count2= 0;
}


    let max = 0;  // Initialize max count 
    let result;   // Initialize result 
    let countArr = new Array();
    // Traversing through the string and maintaining 
    // the count of each character 
    for (let i = 0; i < str.length; i++) { 
        count[str[i]]++; 
        if (max < count[str[i]]) { 
            max = count[str[i]]; 
            result = str[i]; 
        } 
    } 
  
    return result; 

let str = "Hello World!";

str.split('').reduce((a, c) => c+a);