function average(list){
	var sum = 0;
	list.forEach(function(score){
				 sum += score;
				 });
	//console.log(sum);
	var average = sum / list.length;
	average = Math.round(average);
	return average;
}

var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores));
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2));

average(scores);
average(scores2);