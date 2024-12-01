// Source inputs for all 3 MRs, except si5 which is not used for MR3.
const si1 = [
    "The quick brown fox jumps over the lazy dog",
    "xoyqmcgrukswaflnthdjpzibev",
    true,
];
const si2 = ["aaaaaaaaaa", "pnbedfryjwhsavxcmokgizlutq", true];
const si3 = ["", "awfjoxuslizdrmhptvbcqegynk", true];
const si4 = ["1234$#!@?", "e43d@uf$ky1m2vlsc#!jh+pin?", false];
const si5 = [
    "The five boxing wizards jump quickly 0123456789 !@#$%^&*()_+-=[]\\{}|;:\"',./<>?`~",
    "dk@yp2ushxowrijn+fzetcv1lm",
    false,
];

// Follow-up inputs for MR1.
const mr1_fi1 = [
    "Teh ickqu owrbn xfo smpju vreo het lyaz dog",
    "xoyqmcgrukswaflnthdjpzibev",
    true,
];
const mr1_fi2 = ["aaaaaaaaaa", "pnbedfryjwhsavxcmokgizlutq", true];
const mr1_fi3 = ["", "awfjoxuslizdrmhptvbcqegynk", true];
const mr1_fi4 = ["$1?#234@!", "e43d@uf$ky1m2vlsc#!jh+pin?", false];
const mr1_fi5 = [
    "ehT vief nboixg sdaizwr mupj lkcyqui 9275086341 \\$,%=|[;)~+_#}\"]*(<@{`>'/-?.:^!&",
    "dk@yp2ushxowrijn+fzetcv1lm",
    false,
];

// Follow-up inputs for MR2.
const mr2_fi1 = [
    "The quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dog",
    "xoyqmcgrukswaflnthdjpzibev",
    true,
];
const mr2_fi2 = [
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "pnbedfryjwhsavxcmokgizlutq",
    true,
];
const mr2_fi3 = ["", "awfjoxuslizdrmhptvbcqegynk", true];
const mr2_fi4 = [
    "1234$#!@?1234$#!@?1234$#!@?1234$#!@?",
    "e43d@uf$ky1m2vlsc#!jh+pin?",
    false,
];
const mr2_fi5 = [
    "The five boxing wizards jump quickly 0123456789 !@#$%^&*()_+-=[]\\{}|;:\"',./<>?`~The five boxing wizards jump quickly 0123456789 !@#$%^&*()_+-=[]\\{}|;:\"',./<>?`~",
    "dk@yp2ushxowrijn+fzetcv1lm",
    false,
];

// Metamorphic groups for MR1.
const mr1_mgs = [
    [si1, mr1_fi1],
    [si2, mr1_fi2],
    [si3, mr1_fi3],
    [si4, mr1_fi4],
    [si5, mr1_fi5],
];

// Metamorphic groups for MR2.
const mr2_mgs = [
    [si1, mr2_fi1],
    [si2, mr2_fi2],
    [si3, mr2_fi3],
    [si4, mr2_fi4],
    [si5, mr2_fi5],
];

module.exports = { si1, si2, si3, si4, si5, mr1_mgs, mr2_mgs };
