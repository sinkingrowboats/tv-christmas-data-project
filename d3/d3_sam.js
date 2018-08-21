
/* Function: lerp()
 * Input: 'w', a floating point number between 0 and 1.
 *        [a,b], an array of two floating point numbers 'a' and 'b'.   
 * Output: The linear interpolation of 'w' relative to 0 and 1 scaled
           to its value relative to 'a' and 'b'.
 */
var lerp = function(w,[a,b]) { return (1.0-w)*a + w*b; }


/* Function: unlerp()
 * Input: 'x', a floating point number
 *        [x0,x1], an array of two floating point numbers 'x0' and 'x1'.   
 * Output: The linear interpolation of 'x' relative to 'x0' and 'x1' scaled
 		   to its value relative to the standard of 0 and 1
 */
var unlerp = function (x,[x0,x1]) { return (x-x0)/(x1-x0); }


/* Function: minmax()
 * Input: 'arr', an array of numbers
 * Output: An array of two numbers, which contains the minimum value
 * 		   in 'arr' at the 0 index, and the maximum value in 'arr'
 * 		   at the 1 index.
 */
var minmax = function (arr) {
    var minval=arr[0];
    var maxval=minval;
    arr.map(function (x) {
            minval = Math.min(x, minval);
            maxval = Math.max(x, maxval);
        });
    return [minval, maxval];
}

// /* PCA: computes PCA of given array of arrays.
//    uses http://www.numericjs.com for linear algebra */
// var PCA = function (dcols) {
//     if (dcols.length < 3) {
//         d3.select("#pcaWarning").html("PCA() needs at least 3 variables (got " + dcols.length+ ")");
//         return null;
//     }
//     /* else got enough variables */
//     d3.select("#pcaWarning").html("");
//     // dcols: (short) array of (long) data arrays (each element ~ a csv column)
//     // drows: (long) array of data vectors (each element ~ a csv row)
//     var drows = numeric.transpose(dcols);
//     // covar: covariance matrix
//     var covar = numeric.dot(dcols,drows);
//     /* NOTE: numeric.dot is for matrix multiplication in general,
//        which includes matrix-matrix multiply (as above), and
//        matrix-vector multiply, as well as
//        vector-vector (inner) product, which you might want to use for
//        compute coordinates in the basis of PCA eigenvectors */
//     // nmeig: numeric.js's eigensystem representation of covar
//     var nmeig = numeric.eig(covar);
//     /* NOTE: If you see in the javascript console:
//        "Uncaught Error: numeric: eigenvalue iteration does not converge -- increase maxiter?"
//        then it is likely that one or more values being passed to
//        numeric.eig(covar) are not numeric (e.g. "NaN"), which can happen if
//        one or more values in dcols are not numeric */
//     // evec: array of covariance matrix eigenvectors (unit-length)
//     var evec = numeric.transpose(nmeig.E.x);
//     // evec: array of corresponding eigenvalues
//     var eval = nmeig.lambda.x;
//     // esys: zipping up each component of eigensysem into a little object:
//     // "l" for eigenvalue, "v" eigenvector, and "mm" for zero-centered range
//     // of projections of data into that eigenvector
//     var esys = eval.map(function (_,i) {
//             var mindot = 0, maxdot = 0;
//             drows.map(function (_,j) { // learn range of projections
//                     var x = numeric.dot(drows[j],evec[i]);
//                     mindot = Math.min(mindot, x);
//                     maxdot = Math.max(maxdot, x);
//                 });
//             // center range around zero
//             var mmin = Math.min(mindot, -maxdot);
//             var mmax = Math.max(-mindot, maxdot);
//             // make sure the range itself is non-zero
//             if (mmin == mmax) {
//                 mmin = -1;
//                 mmax = 1;
//             }
//             return {"l": eval[i],
//                     "v": evec[i],
//                     // simplify needlessly precise representation of range
//                     "mm": [d3.format(".3f")(mmin), d3.format(".3f")(mmax)]};
//         });
//     // sort eigensystem in descending eigenvalue order
//     esys.sort(function (a,b) {
//             var x = a.l; var y = b.l;
//             return ((x < y) ? 1 : ((x > y) ? -1 : 0));
//         });
//     return esys;
// }

// /* dataNorm should take an array of scalar data values and return an
//    array resulting from two transformations:
//    1) subtract out the mean
//    2) make the variance 1
//    Making the variance 1 means that no data variable will out an outsized
//    influence on the PCA just because of a choice of units: multiplying a
//    variable by 10 won't change its information content, but it would
//    increase that variable's role in a PCA. */

// var dataNorm = function (arr) {
// /* Standardize data in arr- make mean zero and unit variance */

//   //Calculate mean
//     var sum = 0;
//     for(var i = 0; i < arr.length; i++) {
//         sum += Number(arr[i]);
//     }
//     var mean = sum/arr.length;
//     var arr_mean = new Array(arr.length);
//     var stdev = 0;
    
//     //Calculate standard deviation and create new array with zero mean
//     for (var i = 0; i < arr.length; i++) {
//       arr_mean[i] = arr[i] - mean;
//       stdev += Math.pow((arr[i] - mean), 2);
//     }
//     stdev = Math.sqrt(stdev/arr.length);
    
//     //Create new array with unit variance
//     var std_var = new Array(arr.length); 
//     for (var i = 0; i < arr.length; i++) {
//       std_var[i] = arr_mean[i]/stdev;
//     }
//     return std_var;

// }

// /* (from Project2 solution) some stuff we can use for each
//  * univariate map.  Feel free to ignore/delete this function
//  * if you want to structure things differently */
// var stuff = function (what, mmGiven) {
//     var sel = function(d) {return +d[what]}
//     var slc = P3.data.map(sel);
//     var mm = ((typeof mmGiven === 'undefined')
//               ? minmax(slc) // mmGiven not passed, find min,max
//               : mmGiven);   // use given mmGiven
//     return {"select" : sel,
//             "minmax" : mm,
//             "cmlscl" : d3.scale.linear().domain(mm).range([0,P3.CmapLegSize-1]),
//             };
// }

// var dataFinish = function (data) {
//     /* save data for future reference (for simplicity, from here on
//        out P3.data is the only way we'll refer to the data) */
//     P3.data = data;

//     /* much of the code here is from Project2 reference solution
//        http://people.cs.uchicago.edu/~glk/ class/DataVis/p2.js
//        but you should feel free to modify/augment/edit it as you
//        see fit for your work (your code here) */
//     var voteTotMax = 0;
//     P3.data.map(function(d) {
//             var VT = +d["ObamaVotes"] + +d["RomneyVotes"];
//             d["VT"] = VT;
//             d["PL"] = +d["ObamaVotes"]/(1.0 + VT);
//             voteTotMax = Math.max(voteTotMax, VT);
//         });
//     P3.data.map(function(d) {
//             d["VA"] = 1 - Math.pow(1- d["VT"]/voteTotMax, 3);
//         });

//     /* learn earnings ranges */
//     P3.earnWMinMax = minmax(P3.data.map(function(d) {return +d["WE"]}));
//     P3.earnMMinMax = minmax(P3.data.map(function(d) {return +d["ME"]}));

//     /* obesity-related things */
//     P3.obeseStuff = stuff("OB");
//     var _obeseCmap = d3.scale.linear() /* colormap prior to quantization */
//         .domain([0,0.4,1])
//         .range([d3.rgb(100,200,100), d3.rgb(220,220,210), d3.rgb(130,0,0)]);
//     P3.obeseCmap = function(r) {
//         var w0 = Math.round(lerp(unlerp(r,P3.obeseStuff["minmax"]), [-0.5, 6.5]));
//         return _obeseCmap(unlerp(Math.min(6, w0),[-0.5, 6.5]));
//     }

//     /* create unemployment colormap */
//     P3.unempStuff = stuff("UN");
//     P3.unempCmap = d3.scale.linear()
//         .domain([0,1/3,2/3,1].map(function(w) {return lerp(w,P3.unempStuff["minmax"]);}))
//         .range([d3.rgb(0,0,0), d3.rgb(210,0,0), d3.rgb(255,210,0), d3.rgb(255,255,255)]);

//     /* create infant mortality map */
//     P3.imortStuff = stuff("IM");
//     P3.imortCmap = function(d) {
//         var scl = d3.scale.linear().domain(P3.imortStuff["minmax"]);
//         return d3.hcl(scl.range([330,-15])(d),
//                       25*Math.pow(Math.sin(scl.range([0,3.14159])(d)),2),
//                       scl.range([0,100])(d));
//     }

//     /* create univariate voter maps */
//     P3.pleanStuff = stuff("PL", [0,1]);
//     var Dhcl = d3.hcl(d3.rgb(0,0,210));
//     var Rhcl = d3.hcl(d3.rgb(210,0,0));
//     P3.pleanCmap = function(x) {
//         return d3.hcl(x < 0.5 ? Rhcl.h : Dhcl.h,
//                       (x < 0.5 ? Rhcl.c : Dhcl.c)*
//                       (1 - Math.pow(1 - (Math.abs(x-0.5)/0.5),4)),
//                       lerp(x,[Rhcl.l,Dhcl.l]));
//     }

//     /* create bivariate voter map */
//     P3.plean2Cmap = function([pl,va]) {
//         var col = P3.pleanCmap(pl);
//         return d3.hcl(col.h,  lerp(va,[0,col.c]),  lerp(va,[100,col.l]));
//     }

//     /* create bivariate earnings maps */
//     P3.ERcmap = function([mm,ww]) {
//         var erw = unlerp(ww,P3.earnWMinMax);
//         var erm = unlerp(mm,P3.earnMMinMax);
//         return d3.lab(25+40*(erw + erm), 0, 170*(erm - erw));
//     }

//     /* New colormaps that you want to create go here ... */

//     /* (your code here) */

//      /* MYCODE */

//     /* general function that creates a univariate diverging colormap
//      * that allows for customization of the colors */
//     P3.pcaChooseColorsScaled = function(d, lowColorObj, highColorObj) {
//       /* depending on d's distance from 0, the base color will either
//        * be that of the low or high color obj */
//       var full_hcl = (d > .5)?highColorObj:lowColorObj;
//       /* a different scaling of the data that shows d's distance
//        * from zero on an interval of [0,1] */
//       var rescale = ((d > .5)?d-0.5: 0.5-d)*2;

//       /* determine h, c, and l for the color map */
//       /* keeps the hue the same as the base color chosen */
//       var cscl = full_hcl.c;
//       h = full_hcl.h;
//       c = cscl*(1 - Math.pow((1 - (rescale)), 4));
//       l = lerp(rescale, [70, full_hcl['l']]);
    
//       /* convert the hue, chroma, and luminance values into a d3 hcl color */
//       return d3.hcl(h, c, l);
//     }

//     P3.pcaUniMinmax = function(d, mm) {
//     /* function that provides the correct color for the univariate pca buttons*/

//     /* scales d to the interval [0,1] befor passing it off
//      * to the Colorscale function*/
//     scale = unlerp(d, mm);
//     /* get color from pca colorscale funtion with fixed colors */
//     hcl = P3.pcaChooseColorsScaled(scale, d3.hcl(-159, 23, 34), d3.hcl(87, 48, 46));

//     /* convert returned color to a hexidecimal string and returns that */
//     return hcl.toString();

//     }

//     /* creates a bivariate colormap to use for the pca data
//      * data maps */
//     P3.pcaBiCmap = function([dx,dy], mm) {
//       /* scale the passed data to the interval [0,1] by using unlerp */
//       var xscale = unlerp(dx, mm);
//       var yscale = unlerp(dy, mm);
//       /*
//       length = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
//       angle = Math.asin(dy/dx);
//       */ 

//       /* another scaling of the data that is representative of
//        * the data's y distance from x=0 on the interval [0,1] */
//       var rescale = ((yscale > .5)?yscale-0.5: 0.5-yscale)*2;
  
//       /* apply a colormap based on the data's y location. If y is above the
//        * halfway point, y falls into one map, if y is below, it falls into
//        * another */
//       var full_hcl = (yscale > 0.5)?
//       P3.pcaChooseColorsScaled(xscale, d3.hcl(-159, 23, 34), d3.hcl(87, 48, 46)):
//       P3.pcaChooseColorsScaled(xscale, d3.hcl("#311b86"), d3.hcl("#874104"));

//       /* determine h, c, and l for the color map */
//       var cscl = full_hcl.c;
//       /* keeps the hue the same as the base color from the colormap */
//       h = full_hcl.h;
//       /* based on the y distance from x=0, adjust c. The power function keeps
//        * the 0 chroma values concentrated nearer to zero. Borrowed partially
//        * from project 2 */
//       c = cscl*(1 - Math.pow((1 - (rescale)), 15))
//       /* linear varying of the luminance from the outskirts to center
//        * of the graph */
//       l = lerp(rescale, [100, full_hcl.l]);

//       /* turn the h, c, l parameters into an hcl color object and return it's
//        * hexidecimal string representation */
//       return d3.hcl(h, c, l).toString();
//     }
// }

// var choiceSet = function (wat,pvars) {
//     /* is this a univariate map? */
//     CmapUnivariate =(["OB", "UN", "IM", "VU", "PC0", "PC1", "PC2"].indexOf(wat)
//       >= 0); //moved


//     //MYCODE HERE
//     currentwat = wat;
//     currentpvars = pvars;
//     var pcastuff;
//     //END OF MY CODE

//     if (wat.startsWith("PC")) {
//         if (pvars.length < 1) {
//             d3.select("#pcaWarning").html("Select at least one variable below for PCA");
//             return;
//         }
//         d3.select("#pcaWarning").html("");
//         /* Else we have at least one variable for PCA; so we do that here,
//            in the following steps:
//            1) make an array (suppose its called "dcols") of the result
//            of calling dataNorm() on each data variable (your code here)
//            (can be as little as 3 lines) */

//            //Create array where each column is standardized state data based
//            // on selection of pvars
//            var dcols = new Array (pvars.length);
//             for (var i = 0; i < pvars.length; i++) {
//               dcols[i] = dataNorm(P3.data.map(function(d) {return +d[pvars[i]]} ));
//             }

//         /* 2) If less than 3 variables were selected for PCA, add to "dcols"
//            one or two arrays of zeros, so that PCA() has at least three
//            data variables to work on (your code here) (a few lines) */

//           //If less than three pvars selected, pad with zeroes.
//           if (pvars.length < 3) {
//             for (var i = (dcols.length); i < 3; i++) {
//               dcols[i] = new Array(dcols[0].length).fill(0);
//             }
//           }

//         /* 3) call PCA(dcols), and add to P3.data the coordinates of each
//            datum in the basis of the first three principle components.  Note
//            that "var drows = numeric.transpose(dcols)" will get you an array
//            of per-state data (row) vectors, and then with
//            "P3.data.map(function(d,ii) { })" you can set PCA coordinate
//            fields in per-state datum "d" from the dot product between
//            drows[ii] and the PCA eigenvectors. Visualizing the PCA
//            results should use these PCA coordinates in the same way that
//            in the previous project you used the original data variables.
//            (your code here) (roughly ~20 lines of code) */

//             /* following tips from the portion above */
//             var pca = PCA(dcols);
//             var drows = numeric.transpose(dcols);

//             /* create an array that holds which principle
//              * components we want to display */
//             pcavisualize = [];
//             if(wat.startsWith("PC0")) {
//               pcavisualize.push(0);
//               if(wat.length > 3) {
//                 pcavisualize.push(Number(wat.charAt(3)));
//               }
//             }
//             else if (wat.startsWith("PC1")) {
//               pcavisualize.push(1);
//               if(wat.length > 3) {
//                 pcavisualize.push(2);
//               }
//             }
//             else {
//               pcavisualize.push(2);
//             }

//             for (var i = 0; i < P3.data.length; i++) {
//               for(var j = 0; j < pcavisualize.length; j++) {
//                 P3.data[i]["pca_coord" + j] = numeric.dot(pca[pcavisualize[j]].v, drows[i]);
//               }
//             }

//             /* determines which of the minmax intervals is largest
//              * for display purposes */
//             var biggestminmax;
//             if(wat.length < 4) {
//               biggestminmax = pca[pcavisualize[0]].mm;
//             }
//             else {
//               biggestminmax = (pca[pcavisualize[0]].mm[1] > pca[pcavisualize[1]].mm[1])?
//                 pca[pcavisualize[0]].mm:
//                 pca[pcavisualize[1]].mm;
//             }
//              create a pcastuff to ease with encoding the pca
//              * univariate colormaps. most of the "stuff" are predefined
//              * by datafinish, however, since the minmax is always changing
//              * I dedided to define it locally instead 
//             pcastuff = stuff("pca_coord0", biggestminmax);

//             /* because all the predefined colormaps also used predefined
//              * minmax intervals. I chose to keep the function definitions
//              * with the rest to ease your looking and grading, but I further
//              * encapsulated it here so i can use it easily with all the
//              * already provided code */
//             var pcaUniCmap = function(d) {
//               return P3.pcaUniMinmax(d, pcastuff['minmax']);
//             }
//             var pcaBiCmap = function(d) {
//               return P3.pcaBiCmap(d, pcastuff['minmax']);
//             }

//         /* 4) Visualize what the PCA did with the given data variables inside
//            the #pcaMarks svg by changing the text element #pcaXX for
//            all variables XX (selected via d3.select("#pca" + XX)):
//            a) Make the text opaque for the variables actually included in
//            the PCA, and transparent for the rest.
//            b) For the variables in PCA, move the text to a position that
//            indicates how that variable is aligned with the principle
//            component(s) shown (one component for PC0, PC1, PC2, and
//            two components for PC01, PC02, PC12). Compute this by forming
//            a vector of length pvars.length which is all 0s except for 1 at
//            the index of XX in pvars, and then using numeric.dot() to get
//            the dot product with a principle component eigenvector. Since
//            this is the dot product of two unit-length vectors, the result
//            should be in [-1,1], which you should map to coordinates
//            [30,P3.PCALegSize-30]) in X or [P3.PCALegSize-30,30]) in Y.
//            Text is moved by modifying the "transform" attribute to
//            "translate(cx,cy)" for position (cx,cy). For variables not
//            in the PCA, the text should be moved back to the center at
//            (P3.PCALegSize/2,P3.PCALegSize/2).  You can iterate over the
//            #pcaXX with "P3.PCAVars.map(function(XX) { })".
//            Changes to both opacity and position should also be made via a
//            transition of duration TransitionDuration.  (your code here)
//            (roughly ~30 lines of code) */

//            /* empty array that will serve as basis vector template */
//            var basisvector = [];
//            vectorlen = (currentpvars.length > 3)? currentpvars.length: 3;
//            for(var k = 0; k < vectorlen; k++) {
//               basisvector.push(0);
//            }

//            /* run through all the pvars, and toggle the letters to on and their
//             * correct positions if in the pvars arry. if not, toggle off and
//             * return position to 0 by default */
//             P3.PCAVars.map(function(XX) {
//               var index = currentpvars.indexOf(XX);
//               d3.select("#pca" + XX)
//               .transition()
//               .delay(function() { /*added to make text change noticable */
//                 return (CmapUnivariate)? 0: TransitionDuration*1.4; })
//               .duration(TransitionDuration)
//               .attr("opacity", function() {
//                 return (index >= 0)?1:0;
//               })
//               .attr("transform", function() {
//                 var cx = P3.PCALegSize/2;
//                 var cy = P3.PCALegSize/2;
                
//                 /* lerp to correct position */
//                 if(index >= 0) {
//                   basisvector[index] = 1;
//                   var cxScaled = unlerp(numeric.dot(pca[pcavisualize[0]].v, basisvector), [-1,1]);
//                   cx = lerp(cxScaled, [50,P3.PCALegSize-50]);

//                   if(!CmapUnivariate) {
//                     var cyScaled = unlerp(numeric.dot(pca[pcavisualize[1]].v, basisvector), [-1,1]);
//                     cy = lerp(cyScaled, [P3.PCALegSize-50,50]);
//                   }
//                   basisvector[index] = 0;
//                 }
                
//                 return "translate(" + cx + "," + cy + ")";
//               });
            
//             });


//     } else {
//         d3.select("#pcaWarning").html("");
//         /* else this isn't a PCA visualization, so none of the
//            variables are involved in the PCA, so re-center all the PCA
//            marks and make them transparent (your code here) (~10 lines) */

//     }

//     /* set the colormapping function */
//     var colormap = {"OB" : P3.obeseCmap,
//                     "UN" : P3.unempCmap,
//                     "IM" : P3.imortCmap,
//                     "VU" : P3.pleanCmap,
//                     "VB" : P3.plean2Cmap,
//                     "ER" : P3.ERcmap,
//                     /* giving the pc choices their corresponding
//                      * colormap functions */
//                     "PC0" : pcaUniCmap,
//                     "PC1" : pcaUniCmap,
//                     "PC2" : pcaUniCmap,
//                     "PC01" : pcaBiCmap,
//                     "PC02" : pcaBiCmap,
//                     "PC12" : pcaBiCmap,
//                     /*uuuug */
//     }[wat];
//     var cml, cmlx, cmly, sel, mmx, mmy;
//     if (CmapUnivariate) {
//         var stf = {"OB" : P3.obeseStuff,
//                    "UN" : P3.unempStuff,
//                    "IM" : P3.imortStuff,
//                    "VU" : P3.pleanStuff,
//                    /* giving the pc choices their "stuff" */
//                    "PC0" : pcastuff,
//                    "PC1" : pcastuff,
//                    "PC2" : pcastuff,
//         }[wat];
//         [cml,mmx,sel] = [stf["cmlscl"], stf["minmax"], stf["select"]];
//         mmy = null;
//     } else {
//         cml = mmx = mmy = sel = null;
//     }
//     /* handle the bivariate cases */
//     switch (wat) {
//     case "VB" :
//         cmlx = cmly = d3.scale.linear().domain([0, 1]).range([0,P3.CmapLegSize-1]);
//         mmx = mmy = [0,1];
//         sel = function(d) {return [+d.PL,+d.VA]};
//         break;
//     case "ER" :
//         cmlx = d3.scale.linear().domain(P3.earnMMinMax).range([0,P3.CmapLegSize-1]);
//         cmly = d3.scale.linear().domain(P3.earnWMinMax).range([0,P3.CmapLegSize-1]);
//         mmx = P3.earnMMinMax;
//         mmy = P3.earnWMinMax;
//         sel = function(d) {return [+d.ME,+d.WE]};
//         break;
//     case "PC01":
//     case "PC02":
//     case "PC12":
//         /* encodes the map and the legend for all pc bivariate functions */
//         cmlx = cmly = d3.scale.linear().domain(pcastuff['minmax']).range([0, P3.CmapLegSize-1]);
//         mmx = mmy = pcastuff['minmax'];
//         sel = function(d) {return [+d.pca_coord0, +d.pca_coord1]};
//         break;
//     }

//     /* 1) reapply colorDatum to the "fill" of the states in #mapUS.
//        be sure to add a transition that lasts TransitionDuration */
//     d3.select("#mapUS").selectAll("path")
//         .data(P3.data)
//         .transition()
//         .delay(function() { /* added to make color change noticable */
//                 return (CmapUnivariate)? 0: TransitionDuration*1.425; })
//         .duration(TransitionDuration)/* (your code here)*/
//         .style("fill", function(d){ return colormap(sel(d)); });

//     /* 2) reset pixels of cmlImage.data, and redisplay it with
//        P3.cmlContext.putImageData(P3.cmlImage, 0, 0); */
//     if (CmapUnivariate) {
//         for (var j=0, k=0, c; j < P3.CmapLegSize; ++j) {
//             for (var i=0; i < P3.CmapLegSize; ++i) {
//                 if (0 == j) {
//                     c = d3.rgb(colormap(cml.invert(i)));
//                     P3.cmlImage.data[k++] = c.r;
//                     P3.cmlImage.data[k++] = c.g;
//                     P3.cmlImage.data[k++] = c.b;
//                     P3.cmlImage.data[k++] = 255;
//                 } else {
//                     P3.cmlImage.data[k] = P3.cmlImage.data[(k++)-4*P3.CmapLegSize];
//                     P3.cmlImage.data[k] = P3.cmlImage.data[(k++)-4*P3.CmapLegSize];
//                     P3.cmlImage.data[k] = P3.cmlImage.data[(k++)-4*P3.CmapLegSize];
//                     P3.cmlImage.data[k] = 255; k++;
//                 }
//             }
//         }
//     } else {
//         for (var j=0, k=0, c; j < P3.CmapLegSize; ++j) {
//             for (var i=0; i < P3.CmapLegSize; ++i) {
//                 c = d3.rgb(colormap([cmlx.invert(i),
//                                      cmly.invert(P3.CmapLegSize-1-j)]));
//                 P3.cmlImage.data[k++] = c.r;
//                 P3.cmlImage.data[k++] = c.g;
//                 P3.cmlImage.data[k++] = c.b;
//                 P3.cmlImage.data[k++] = 255;
//             }
//         }
//     }
//     P3.cmlContext.putImageData(P3.cmlImage, 0, 0);

//     /* 3) set d3.select("#xminlabel").html(), and similarly for the other
//        three labels, to reflect the range of values that are
//        colormapped when displaying "wat".  For univariate maps,
//        set xminlabel and yminlabel to show the range, and set
//        yminlabel and ymaxlabel to an empty string.  For bivariate
//        maps, set all labels to show the X and Y ranges. */
//     d3.select("#xminlabel").html("<text>" + mmx[0] + "</text>");
//     d3.select("#xmaxlabel").html("<text>" + mmx[1] + "</text>");
//     if (CmapUnivariate) {
//         d3.select("#yminlabel").html("<text></text>");
//         d3.select("#ymaxlabel").html("<text></text>");
//     } else {
//         d3.select("#yminlabel").html("<text>" + mmy[0] + "</text>");
//         d3.select("#ymaxlabel").html("<text>" + mmy[1] + "</text>");
//     }

//     /* 4) update the geometric attributes (rx, ry, cx, cy) of the #cmlMarks
//        to indicate the data variables, and any other attributes you want
//        to control according to whether the state is selected. Changes should
//        happen with a transition of duration TransitionDuration.
//        (your code here) (or interspersed below) */
//     if (CmapUnivariate) {
//       /* here, maintain hilighted attributes for state hexagons and
//        * marks on the color maps using global array of currently selected
//        * states for univariate maps*/
//         d3.select("#cmlMarks").selectAll("ellipse")
//             .data(P3.data)
//             .transition().duration(TransitionDuration) //added
//             .attr("rx", 0.05) // if zero, outline may disappear
//             .attr("ry", P3.CmapLegSize/4)
//             .attr("cx", function(d) { return 0.5+cml(sel(d)); })
//             .attr("cy", P3.CmapLegSize/2)
//             .attr("stroke", function(d) { return (selectedStates.indexOf(d.State) >= 0)?
//                 "white":"black"})
//             .attr("stroke-opacity", function(d) {return (selectedStates.indexOf(d.State) >= 0)?
//                 0.9:0.6})
//             .attr("stroke-width", function(d) {return (selectedStates.indexOf(d.State) >= 0)?
//                 3: 2})
//             .attr("fill", "black")
//             .attr("fill-opacity", function(d) {return (selectedStates.indexOf(d.State) >=0)?
//                 .6: 0;});
//     } else {
//         /* maintain attributes for bivariate maps */
//         d3.select("#cmlMarks").selectAll("ellipse")
//             .data(P3.data)
//             .transition().duration(TransitionDuration)
//             .attr("rx", MarkRadius).attr("ry", MarkRadius)
//             .attr("cx", function(d) { return 0.5+cmlx(sel(d)[0]); })
//             .attr("cy", function(d) { return P3.CmapLegSize-0.5-cmly(sel(d)[1]); })
//             .attr("stroke", function(d) { return (selectedStates.indexOf(d.State) >= 0)?
//                 "white":"black"})
//             .attr("stroke-opacity", function(d) {return (selectedStates.indexOf(d.State) >= 0)?
//                 0.9:0.6})
//             .attr("stroke-width", function(d) {return (selectedStates.indexOf(d.State) >= 0)?
//                 3: 2})
//             .attr("fill", "black")
//             .attr("fill-opacity", function(d) {return (selectedStates.indexOf(d.State) >=0)?
//                 .7: 0;});
//     }
// }

// /* shouldn't have to change anything from here on */
// return { // the P3 "API"
//     HexScaling: HexScaling,
//     choiceSet: choiceSet,
//     dataFinish: dataFinish,
//     toggleState: toggleState,
// };

// })(); // end "var P3=(function () {" module container

// /* Answer questions here. Each should be no more than ~40 words.

// #1) Concisely describe and justify your method of indicating, in the map
// and in the colormap, whether a state is selected.

// In both the colormap and the statemap, stroke is always white because it has
// a high luminance that distinguishes it. Good luminance contrast allows these
// elements to be more distinct and easier to see in motion. Black fills the
// ellipses so that when there are values on the bivariate colormap close to
// white, the ellipse is still contrasted. Also, slighltly opaque to perceive
// overlaps better.


// #2) In the terminology of "An Algebraic Process for Visualization
// Design" (class May 26), what is one "confuser" for PCA as it it used
// in this project (i.e. a particular change in the data that will have
// no significant effect on the PCA result)?  (hint: think about what
// dataNarm() does, and how the covariance matrix is computed).  There
// are at least three possible answers.

// PCA rotates to an eigen-basis to maximize the importance of
// variance/correlation, minimizing the importance of direction. If a dataset were
// rotated by 90˚, although representing a different observable phenomenon, pca on
// the original and rotated data would be nearly the same, and is thus a confuser
// because it is difficult to tell how changing the data pre-pca will effect the
// data post-pca.


// #3) Concisely describe and justify your design of colormaps for the
// univariate and bivarite cases of PCA visualization.

// Used diverging colormaps to ease grouping and seeing correlation. Showing both
// the extremes the mean/average is. Our goal was to ease the viewer in seeing
// clustering not immediately known by the graph legend and points. Caveat, it
// became very difficult to create a bivariate diverging colormap that showed both
// x and y means, as such, 0 is the same values on both positive and negative
// sides of both axes. 


// #4) Based on exploring the data with PCA, what was a result that you found
// from PCA of three or four variables?  Describe your result in terms of
// which variables had similar vs complementary contributions to the PCA,
// or the geographic trend you saw in the map.

// It becomes much easier to see correlations in the data with more variables.
// It looks clear that Google Searches and Population Size are well correlated,
// as with Political Leaning and Women's Earnings. The regions of the US,
// especially North and South, tend to have grouped colorings which seems
// representative of distinct cultural differences between the regions.


// (extra credit) #5) How did you maximize visual consistency when switching
// between PCA and other radio buttons?

// Didn't do it, but maybe it has something to do with changing the transiton
// funtion to be based on moving the points cicularly around the center rather
// than just in a straight line so we can see data movement without illusions???
// */
