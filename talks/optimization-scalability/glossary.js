/* Hover glossary for the deck.
 *
 * Edit this file to add or change a definition -- nothing in the slides needs
 * touching. On load, the script finds the first use of each term on every
 * slide and attaches a tooltip with a definition and an example.
 *
 * Entry fields:
 *   term     the heading shown in the tooltip
 *   aliases  exact spellings to match in the slide text (spaces match any whitespace)
 *   cs       true = case-sensitive (use for acronyms like P, NP, LP)
 *   def      the definition
 *   ex       a concrete example
 *
 * Rules the matcher follows:
 *   - first occurrence per slide only, so slides don't fill up with underlines
 *   - never inside math, headings, links, or the live widget
 *   - longest alias wins, so "NP-hard" is matched before "NP"
 *   - a term never matches inside a longer hyphenated word ("NP" in "co-NP")
 *
 * Examples deliberately avoid measured timings, which change run to run.
 */
window.GLOSSARY = [
  // ---------------------------------------------------------------- scaling
  { term: "Scaling exponent (α)", aliases: ["scaling exponent", "exponent"],
    def: "The power α in cost ≈ C · nᵅ. It says how fast cost grows as the problem gets bigger: doubling n multiplies the cost by 2ᵅ.",
    ex: "α = 1: double the size, double the time. α = 3: double the size, 8× the time." },
  { term: "Polynomial time", aliases: ["polynomial time", "polynomial-time", "poly-time", "polynomial"],
    def: "Cost that grows like nᵏ for some fixed k, where n is the input size. Complexity theory treats this as \"efficient\".",
    ex: "Sorting a list (about n log n steps) and solving an LP by interior point are polynomial. Trying every subset of n items (2ⁿ) is not." },
  { term: "Exponential", aliases: ["exponential", "exponentially"],
    def: "Cost that grows like cⁿ: every extra unit of input multiplies the work by a constant factor.",
    ex: "Checking every subset of 60 items is 2⁶⁰ ≈ 10¹⁸ cases. Adding a 61st item doubles it." },
  { term: "Sub-exponential", aliases: ["sub-exponential"],
    def: "Grows faster than every polynomial, but slower than every exponential cⁿ.",
    ex: "The number field sieve's cost grows roughly like e raised to the cube root of the number's digit count — far below trying every divisor, but not polynomial." },
  { term: "Asymptotic", aliases: ["asymptotics", "asymptotically", "asymptotic"],
    def: "Describing behaviour as the input grows without bound, ignoring constant factors and small cases.",
    ex: "An O(n²) algorithm beats an O(n³) one asymptotically, even if it is slower at n = 10." },
  { term: "Order of magnitude", aliases: ["orders of magnitude", "order of magnitude"],
    def: "A factor of 10.",
    ex: "1 second vs 10 seconds is one order of magnitude; 1 second vs 1,000 seconds is three." },
  { term: "Log-log plot", aliases: ["log-log"],
    def: "A chart with logarithmic scales on both axes. A power law y = C · xᵅ becomes a straight line whose slope is α.",
    ex: "A line with slope 2 on the runtime chart means doubling n quadruples the time." },
  { term: "Power law", aliases: ["power laws", "power law"],
    def: "A relationship of the form y = C · xᵅ.",
    ex: "Solve time ≈ C · n² would be a power law with exponent 2." },
  { term: "Curve fit", aliases: ["fitted", "Fits"], cs: true,
    def: "Choosing a model's parameters to match data. Here: a straight line through log(time) against log(n), whose slope is the exponent α.",
    ex: "Fitting the timings from n = 100 to 2,000 produced the α values quoted on these slides." },
  { term: "Extrapolation", aliases: ["extrapolation", "extrapolated"],
    def: "Predicting beyond the range of data a model was fitted on. Often unreliable.",
    ex: "Our curves are fitted up to n = 2,000, so the widget's values at n = 10,000 are extrapolated." },
  { term: "Iteration", aliases: ["iteration count", "per-iteration", "iterations", "iteration"],
    def: "One pass of a solver's main loop. Total time = number of iterations × cost per iteration.",
    ex: "Interior point on the dense LP took nearly the same number of iterations at every size; each one just got more expensive." },

  // ------------------------------------------------------------ foundations
  { term: "Objective", aliases: ["objective"],
    def: "The quantity an optimization problem minimizes or maximizes.",
    ex: "Total cost of a production plan, or the length of a delivery route." },
  { term: "Constraint", aliases: ["constraints", "constraint"],
    def: "A condition every acceptable solution must satisfy, written as an equation or inequality.",
    ex: "\"Each machine runs at most 8 hours a day\" becomes hours ≤ 8." },
  { term: "Feasible region", aliases: ["feasible region"],
    def: "The set of all points that satisfy every constraint. The optimum is the best point in it.",
    ex: "For x ≥ 0, y ≥ 0, x + y ≤ 1, the feasible region is a triangle." },
  { term: "Solver", aliases: ["solvers", "solver"],
    def: "A program that takes an optimization problem and returns an optimal (or near-optimal) solution.",
    ex: "HiGHS, Ipopt and MadNLP are the solvers benchmarked here." },
  { term: "Instance", aliases: ["instances", "instance"],
    def: "One specific problem from a family, with every number filled in.",
    ex: "\"The banded LP at n = 500\" is one instance of the banded-LP family." },
  { term: "Benchmark", aliases: ["benchmark"],
    def: "A fixed set of test problems run the same way every time, so performance can be measured and compared.",
    ex: "Our benchmark solves four problem families at twelve sizes with each solver." },
  { term: "NIST", aliases: ["NIST"], cs: true,
    def: "The U.S. National Institute of Standards and Technology, which sets federal cryptography standards.",
    ex: "NIST ran the multi-year competition that selected ML-KEM and ML-DSA." },

  // ------------------------------------------------------------ problems
  { term: "Linear program (LP)", aliases: ["linear programming", "linear programs", "linear program", "LP"], cs: false,
    def: "Optimizing a linear objective subject to linear equality and inequality constraints.",
    ex: "Choose production amounts to minimize cost while meeting demand, with each machine limited to 8 hours a day." },
  { term: "Nonlinear program (NLP)", aliases: ["nonlinear programs", "nonlinear program", "NLP"],
    def: "An optimization problem whose objective or constraints are nonlinear — curved rather than flat.",
    ex: "Minimizing (1 − x)² + 100(y − x²)², the Rosenbrock function used in this deck." },
  { term: "Integer programming", aliases: ["integer linear programming", "integer programming", "integer-constrained", "integrality"],
    def: "Optimization where some variables must be whole numbers. NP-hard in general.",
    ex: "Decide whether to build a warehouse (1) or not (0) — you cannot build 0.4 of one." },
  { term: "Convex optimization", aliases: ["convex optimization"],
    def: "Minimizing a bowl-shaped (convex) function over a convex set. Every local minimum is the global minimum, which is what makes these problems tractable.",
    ex: "Least-squares regression and every LP are convex problems." },
  { term: "Nonconvex", aliases: ["nonconvexity", "nonconvex"],
    def: "A problem whose objective or feasible region has \"dents\", so there can be many local optima and a local method can get stuck in the wrong one.",
    ex: "A mountain range: the nearest valley is not necessarily the lowest one." },
  { term: "Rosenbrock function", aliases: ["Rosenbrock"],
    def: "A classic test function, (1 − x)² + 100(y − x²)², whose minimum at (1, 1) lies at the bottom of a long, curved valley — easy to locate, hard to follow.",
    ex: "\"Extended\" Rosenbrock chains n variables so each one couples only to its neighbour." },
  { term: "Polytope", aliases: ["polytope"],
    def: "The flat-sided region carved out by a set of linear inequalities — the feasible region of an LP.",
    ex: "x ≥ 0, y ≥ 0, x + y ≤ 1 carves out a triangle: a 2-D polytope." },
  { term: "Vertex", aliases: ["vertices", "vertex"],
    def: "A corner point of a polytope. If an LP has an optimal solution and its region has corners, some corner is optimal.",
    ex: "A square has 4 vertices; simplex only ever visits corners like these." },

  // ------------------------------------------------------------- methods
  { term: "Simplex method", aliases: ["simplex", "Dantzig"],
    def: "Dantzig's 1947 LP algorithm: move from corner to corner of the feasible region, improving the objective each step, until no neighbouring corner is better.",
    ex: "In 2-D the feasible region is a polygon; simplex walks along its edges to the best corner." },
  { term: "Interior point method", aliases: ["interior point", "interior-point"],
    def: "Solves an optimization problem by moving through the inside of the feasible region, pushed away from the boundary by a barrier, instead of walking along its edges.",
    ex: "Ipopt and HiGHS-ipm are interior point solvers; the central-path animation shows one at work." },
  { term: "Ellipsoid method", aliases: ["ellipsoid", "Khachiyan"],
    def: "Khachiyan's 1979 algorithm, the first proof that LPs can be solved in polynomial time. Historically decisive, slow in practice.",
    ex: "It repeatedly shrinks an ellipsoid known to contain the optimum until it is small enough." },
  { term: "Karmarkar's algorithm", aliases: ["Karmarkar"],
    def: "Narendra Karmarkar's 1984 interior point method — the first polynomial-time LP algorithm that was also fast in practice.",
    ex: "It set off the wave of interior point solvers that includes HiGHS-ipm." },
  { term: "Klee–Minty cube", aliases: ["Klee–Minty", "Klee-Minty"],
    def: "A family of LPs (1972) whose feasible region is a squashed cube, on which Dantzig's original simplex rule visits all 2ⁿ corners.",
    ex: "At n = 30 that is over a billion pivots, on a tiny problem." },
  { term: "Barrier", aliases: ["barrier"],
    def: "A term added to the objective that blows up at the boundary of the feasible region, keeping an interior point method strictly inside. Its weight μ is shrunk toward zero.",
    ex: "To keep g(x) ≥ 0, minimize f(x) − μ · log g(x): as g(x) → 0 the log term → +∞." },
  { term: "Central path", aliases: ["central path"],
    def: "The curve traced by the barrier problem's solution as μ shrinks to zero. Interior point methods follow it to the optimum.",
    ex: "The orange trail in the animation: each point is the optimum for one value of μ." },
  { term: "Heuristic", aliases: ["heuristics", "heuristic"],
    def: "A method that usually works well but comes with no guarantee of optimality or speed.",
    ex: "AMD rarely finds the best elimination order, but finds a good one fast." },
  { term: "Ipopt", aliases: ["Ipopt"],
    def: "An open-source interior point solver for large nonlinear programs, from the COIN-OR project.",
    ex: "Used on both the LP and NLP families in this benchmark." },
  { term: "HiGHS", aliases: ["HiGHS"],
    def: "An open-source solver for linear and mixed-integer programs, offering both simplex and interior point methods.",
    ex: "\"HiGHS-simplex\" and \"HiGHS-ipm\" in this deck are the same solver in its two modes." },
  { term: "MadNLP", aliases: ["MadNLP"],
    def: "An open-source interior point solver for nonlinear programs, written in Julia and designed to run on GPUs too.",
    ex: "It tracked Ipopt closely on our NLP families." },

  // ------------------------------------------------------ linear algebra
  { term: "KKT system", aliases: ["KKT system", "KKT"],
    def: "The linear system an optimization solver solves each iteration, built from the Karush–Kuhn–Tucker optimality conditions. Solving it usually dominates the runtime.",
    ex: "With n variables and m constraints it is an (n + m) × (n + m) matrix — its sparsity decides whether an iteration takes milliseconds or minutes." },
  { term: "Hessian", aliases: ["Hessians", "Hessian"],
    def: "The matrix of second derivatives of a function: entry (i, j) is ∂²f / ∂xᵢ∂xⱼ. It describes curvature, and is zero wherever two variables never interact.",
    ex: "For f = x² + 3xy, the Hessian is [[2, 3], [3, 0]]." },
  { term: "Jacobian", aliases: ["Jacobians", "Jacobian"],
    def: "The matrix of first derivatives of a set of functions: row i is the gradient of constraint i.",
    ex: "For the constraints x + y = 1 and x · y = 2, the Jacobian is [[1, 1], [y, x]]." },
  { term: "Lagrangian", aliases: ["Lagrangian"],
    def: "The objective plus each constraint multiplied by a Lagrange multiplier λ. Optimality conditions are written in terms of it.",
    ex: "Minimize f(x) subject to c(x) = 0  →  L(x, λ) = f(x) + λ · c(x)." },
  { term: "Factorization", aliases: ["factorization", "factorizations", "factorize", "factorized"],
    def: "Rewriting a matrix as a product of simpler (e.g. triangular) matrices so linear systems can be solved quickly. Usually the most expensive step inside a solver.",
    ex: "Cholesky factorization writes a symmetric positive-definite A as L · Lᵀ, with L lower-triangular." },
  { term: "Sparsity", aliases: ["sparsity", "sparse"],
    def: "A matrix is sparse when most of its entries are zero. Algorithms that skip the zeros save both time and memory.",
    ex: "A 60 × 60 tridiagonal matrix holds about 180 nonzeros instead of 3,600 entries." },
  { term: "Dense", aliases: ["dense"],
    def: "A matrix in which most entries are nonzero, so there is nothing to skip.",
    ex: "Our dense NLP's Hessian at n = 60: all 1,830 entries of its lower triangle are nonzero." },
  { term: "Nonzeros", aliases: ["nonzeros"],
    def: "The entries of a sparse matrix that are not zero — the ones a solver actually stores and computes with. Their count is the usual size measure for sparse problems.",
    ex: "The tridiagonal Hessian at n = 60 has 119 stored nonzeros." },
  { term: "Banded matrix", aliases: ["banded", "bandwidth"],
    def: "A sparse matrix whose nonzeros sit within a fixed distance (the bandwidth) of the diagonal. Factorizing one costs O(n) when the bandwidth is fixed.",
    ex: "Time-stepping problems — today's inventory depends only on yesterday's — are naturally banded." },
  { term: "Tridiagonal", aliases: ["tridiagonal"],
    def: "Nonzeros only on the main diagonal and the diagonals directly above and below it: a band of width 1.",
    ex: "In extended Rosenbrock, variable i interacts only with i − 1 and i + 1, so the Hessian is tridiagonal." },
  { term: "Fill-in", aliases: ["fill-in", "fills in"],
    def: "New nonzeros that factorization creates in positions that were zero in the original matrix.",
    ex: "Eliminating a variable connected to 5 others can create nonzeros linking all 5 to each other." },
  { term: "Elimination order", aliases: ["elimination orderings", "elimination ordering", "elimination order", "ordering"],
    def: "The order in which a factorization eliminates variables. It never changes the answer, but can change the fill-in — and so the cost — enormously.",
    ex: "The arrow matrix: dense row first → 1,830 nonzeros; dense row last → 119." },
  { term: "Arrow matrix", aliases: ["arrow matrix"],
    def: "A matrix that is zero except for its diagonal and one full row and column, shaped like an arrowhead. The textbook case of ordering mattering.",
    ex: "One \"hub\" variable coupled to all the others, like a single shared budget constraint." },
  { term: "AMD ordering", aliases: ["AMD"], cs: true,
    def: "Approximate Minimum Degree: a fast heuristic that chooses an elimination order by always eliminating the least-connected variable next, to limit fill-in.",
    ex: "Sparse solvers commonly reorder a matrix with AMD before factorizing it." },
  { term: "METIS", aliases: ["METIS"], cs: true,
    def: "A graph-partitioning library whose nested-dissection orderings reduce fill-in, especially on large problems from meshes and networks.",
    ex: "Cut the problem's graph along a small separator, eliminate each half first and the separator last — then repeat inside each half." },

  // --------------------------------------------------------------- hardware
  { term: "Peak RSS", aliases: ["peak RSS", "resident-set", "RSS"],
    def: "Resident set size: the physical memory a process occupies. \"Peak\" is the most it held at any moment.",
    ex: "Dense NLP at n = 2,000 raised peak RSS by hundreds of megabytes; the banded families barely moved it." },
  { term: "FLOP", aliases: ["FLOPs", "FLOP"], cs: true,
    def: "A floating-point operation: one addition, multiplication, etc. on real numbers. Counting FLOPs is the standard way to estimate compute cost.",
    ex: "Multiplying two dense n × n matrices takes about 2n³ FLOPs." },
  { term: "Floating-point", aliases: ["floating-point"],
    def: "How computers represent real numbers: like scientific notation, in binary, with a fixed number of digits.",
    ex: "A 32-bit float stores about 7 significant decimal digits." },
  { term: "DRAM", aliases: ["DRAM"], cs: true,
    def: "Main memory: large, but slow and energy-hungry compared with on-chip memory.",
    ex: "Fetching one 32-bit word from DRAM costs about 640 pJ — roughly 700 floating-point additions (Horowitz, 2014)." },
  { term: "SRAM", aliases: ["SRAM"], cs: true,
    def: "Fast on-chip memory used for caches — far cheaper to access than DRAM, and far smaller.",
    ex: "About 5 pJ per 32-bit read from an 8 KB cache, versus about 640 pJ from DRAM (Horowitz, 2014)." },
  { term: "Moore's law", aliases: ["Moore's law", "Moore’s law"],
    def: "The observation that the number of transistors on a chip doubled roughly every two years for decades.",
    ex: "1977 to 1994 is about 8–9 doublings: a few hundred times more transistors." },

  // -------------------------------------------------------------- complexity
  { term: "Complexity class", aliases: ["complexity classes", "complexity class"],
    def: "A set of problems grouped by the resources — time, memory — needed to solve them.",
    ex: "P, NP and BQP are complexity classes." },
  { term: "Decision problem", aliases: ["decision problem"],
    def: "A problem with a yes/no answer. Classes such as P and NP are defined for decision problems.",
    ex: "\"Is there a tour shorter than 1,000 km?\" is the decision version of \"find the shortest tour\"." },
  { term: "P", aliases: ["P"], cs: true,
    def: "The class of yes/no problems solvable in polynomial time.",
    ex: "\"Is this list sorted?\" and \"Does this LP have a solution with cost ≤ 10?\" are both in P." },
  { term: "NP", aliases: ["NP"], cs: true,
    def: "Yes/no problems where a proposed \"yes\" answer can be checked in polynomial time. The name means nondeterministic polynomial — not \"non-polynomial\".",
    ex: "Sudoku: finding a solution may be hard, but checking a filled-in grid is quick." },
  { term: "NP-complete", aliases: ["NP-complete"], cs: true,
    def: "The problems in NP that every other NP problem reduces to. A fast algorithm for any one of them would give a fast algorithm for all of NP.",
    ex: "Boolean satisfiability (SAT), the decision version of the travelling-salesman problem, and set partitioning." },
  { term: "NP-hard", aliases: ["NP-hard"], cs: true,
    def: "At least as hard as every problem in NP, but not necessarily in NP itself — it need not even be a yes/no question.",
    ex: "Finding the cheapest travelling-salesman tour is an optimization problem, so it is NP-hard rather than NP-complete." },
  { term: "co-NP", aliases: ["co-NP"], cs: true,
    def: "Problems where a \"no\" answer can be checked quickly — the mirror image of NP.",
    ex: "\"Is this logic formula false for every input?\" A \"no\" is proved by one input that makes it true." },
  { term: "Polynomial hierarchy", aliases: ["polynomial hierarchy"],
    def: "A tower of complexity classes above P and NP, built from alternating \"there exists\" and \"for all\" quantifiers. A \"collapse\" would mean the tower is shorter than believed — thought very unlikely.",
    ex: "If NP = co-NP, the whole hierarchy collapses to its first level." },
  { term: "SAT", aliases: ["SAT"], cs: true,
    def: "Boolean satisfiability: can the variables of a logic formula be set true/false to make it true? The first problem proved NP-complete (Cook, 1971).",
    ex: "(x OR y) AND (NOT x OR y) is satisfied by setting y = true." },
  { term: "BQP", aliases: ["BQP"], cs: true,
    def: "Bounded-error quantum polynomial time: problems a quantum computer can solve efficiently with small error probability.",
    ex: "Factoring is in BQP, thanks to Shor. NP-complete problems are believed not to be." },
  { term: "Reduction", aliases: ["reductions", "reduction"],
    def: "A transformation of one problem into another, so an algorithm for the second also solves the first. Used to show one problem is at least as hard as another.",
    ex: "Sudoku reduces to SAT: translate the grid into a logic formula and hand it to a SAT solver." },
  { term: "Randomized reduction", aliases: ["randomized reductions", "randomized reduction"],
    def: "A reduction that is allowed to make random choices and succeeds with high probability.",
    ex: "Exact SVP is known to be NP-hard only under randomized reductions (Ajtai, 1998)." },
  { term: "Worst-case to average-case reduction", aliases: ["worst-case to average-case reductions", "worst-case to average-case reduction", "worst-case to average-case"],
    def: "A proof that solving random instances of a problem would let you solve its hardest instances — so \"hard on average\" follows from \"hard in the worst case\".",
    ex: "Ajtai (1996) proved one for the lattice problem SIS; Regev (2005) for LWE." },
  { term: "Worst case", aliases: ["worst-case", "worst case"],
    def: "Performance on the hardest possible input of a given size. Complexity classes are usually worst-case statements.",
    ex: "Simplex takes exponentially many steps on the Klee–Minty cube, yet is fast on typical problems." },
  { term: "Average case", aliases: ["average-case", "average case"],
    def: "Performance on inputs drawn at random from some distribution.",
    ex: "Cryptography needs average-case hardness: a randomly generated key must be hard to break, not just a few special ones." },
  { term: "One-way function", aliases: ["one-way functions", "one-way function"],
    def: "Easy to compute, but hard to invert on most inputs. Whether they exist is unproven; if they do, P ≠ NP.",
    ex: "Multiplying two large primes is quick; recovering them from the product is believed to be hard." },

  // ------------------------------------------------------------- crypto
  { term: "Public-key cryptography", aliases: ["public-key"],
    def: "Cryptography with a key pair: a public key anyone can use to encrypt or verify, and a private key only its owner holds.",
    ex: "RSA, elliptic-curve cryptography and ML-KEM are all public-key systems." },
  { term: "Symmetric cryptography", aliases: ["symmetric cryptography"],
    def: "Both parties share the same secret key, used to encrypt and decrypt.",
    ex: "AES is symmetric; a public-key exchange is typically used first to agree on the AES key." },
  { term: "Cryptanalysis", aliases: ["cryptanalysis"],
    def: "The study of breaking cryptographic schemes. It is how concrete key sizes are chosen in practice.",
    ex: "ML-KEM's parameters were set so that the best known lattice attacks remain far out of reach." },
  { term: "Security level", aliases: ["112-bit-security", "112-bit"],
    def: "A scheme has k-bit security if the best known attack takes about 2ᵏ operations.",
    ex: "RSA-2048 is rated at about 112 bits; AES-128 at 128 bits." },
  { term: "RSA", aliases: ["RSA-2048", "RSA"], cs: true,
    def: "A public-key cryptosystem (Rivest, Shamir and Adleman, 1977) whose security relies on the difficulty of factoring large integers.",
    ex: "RSA-2048 uses a 2048-bit public number N = p · q. Anyone who learns p and q can break it." },
  { term: "Discrete logarithm", aliases: ["discrete logarithm", "discrete log"],
    def: "Given g and gˣ in a suitable group, find x. Easy forwards; believed hard to reverse on classical computers.",
    ex: "Modulo 23, 5ˣ ≡ 8 has solution x = 6 — trivial here, infeasible with 256-bit numbers." },
  { term: "Diffie–Hellman", aliases: ["Diffie–Hellman", "Diffie-Hellman"],
    def: "A way for two parties to agree on a shared secret over a public channel, based on the discrete logarithm problem.",
    ex: "Alice sends gᵃ, Bob sends gᵇ; both compute gᵃᵇ, which an eavesdropper seeing only gᵃ and gᵇ cannot (classically)." },
  { term: "Elliptic-curve cryptography (ECC)", aliases: ["elliptic curves", "ECDSA", "ECDH", "ECC"],
    def: "Public-key cryptography built on the discrete logarithm problem in an elliptic-curve group. Much shorter keys than RSA for the same security.",
    ex: "A 256-bit elliptic-curve key is comparable to roughly 3072-bit RSA." },
  { term: "AES", aliases: ["AES-128", "AES-256", "AES"], cs: true,
    def: "The Advanced Encryption Standard, the dominant symmetric cipher. The number is the key length in bits.",
    ex: "AES protects most HTTPS traffic once the connection is set up." },
  { term: "Hash function (SHA)", aliases: ["SHA-256", "SHA-384"], cs: true,
    def: "Maps any input to a fixed-size fingerprint. Finding an input for a given output, or two inputs with the same output, should be infeasible. SHA-256 produces 256 bits.",
    ex: "Git identifies every commit by a hash of its contents." },
  { term: "Preimage resistance", aliases: ["preimage resistance"],
    def: "For a hash function: given an output, it should be infeasible to find any input that produces it.",
    ex: "For SHA-256 that takes about 2²⁵⁶ guesses classically, and about 2¹²⁸ with Grover's algorithm." },
  { term: "Harvest now, decrypt later", aliases: ["harvest now, decrypt later"],
    def: "Recording encrypted data today in order to decrypt it once a capable quantum computer exists.",
    ex: "Traffic captured in 2025 under RSA could be read in 2035 — if a large enough quantum computer exists by then." },
  { term: "NIST IR 8547", aliases: ["IR 8547"], cs: true,
    def: "NIST Internal Report 8547 (initial public draft, 2024): the plan for moving U.S. systems off quantum-vulnerable cryptography.",
    ex: "Deprecate 112-bit public-key algorithms such as RSA-2048 after 2030; disallow quantum-vulnerable algorithms after 2035." },

  // ------------------------------------------------------------- quantum
  { term: "Shor's algorithm", aliases: ["Shor"], cs: true,
    def: "A quantum algorithm (1994) that factors integers and computes discrete logarithms in polynomial time — breaking RSA, Diffie–Hellman and elliptic curves on a large enough quantum computer.",
    ex: "It finds the period of aˣ mod N, and that period reveals N's factors." },
  { term: "Grover's algorithm", aliases: ["Grover"], cs: true,
    def: "A quantum algorithm (1996) that searches N unstructured possibilities in about √N steps: a quadratic speedup, and provably the best possible for unstructured search.",
    ex: "A 128-bit key has 2¹²⁸ possibilities; Grover needs about 2⁶⁴ steps — so AES-256 restores the margin." },
  { term: "Post-quantum cryptography", aliases: ["post-quantum"],
    def: "Cryptography designed to resist quantum attacks while running on ordinary computers today.",
    ex: "ML-KEM (FIPS 203) replaces Diffie–Hellman-style key exchange." },
  { term: "Lattice", aliases: ["lattice problems", "lattice problem", "lattice-based", "lattices", "lattice"],
    def: "A regular grid of points in n dimensions: every whole-number combination of a set of basis vectors.",
    ex: "In 2-D, all points a·(1, 0) + b·(0.5, 1) for integers a and b form a slanted grid." },
  { term: "Shortest Vector Problem (SVP)", aliases: ["Shortest Vector Problem", "SVP"],
    def: "Given a lattice, find its shortest nonzero vector. Easy in 2-D; believed very hard in hundreds of dimensions.",
    ex: "Post-quantum schemes rely on approximate versions of problems like this being hard." },
  { term: "SIS", aliases: ["SIS"], cs: true,
    def: "Short Integer Solution: find a short nonzero integer vector z with A·z = 0 (mod q). A lattice problem with a worst-case to average-case reduction (Ajtai, 1996).",
    ex: "ML-DSA's security rests partly on a structured variant, Module-SIS." },
  { term: "LWE", aliases: ["LWE"], cs: true,
    def: "Learning With Errors: recover a secret vector s from noisy linear equations b = A·s + e (mod q). Regev (2005) tied it to worst-case lattice problems.",
    ex: "ML-KEM rests on a structured variant, Module-LWE." },
  { term: "Key encapsulation", aliases: ["key encapsulation"],
    def: "Using a recipient's public key to create a fresh shared secret plus a ciphertext that only the recipient can open. The secret then keys a symmetric cipher.",
    ex: "ML-KEM produces a 32-byte shared secret, which becomes an AES key." },
  { term: "ML-KEM", aliases: ["ML-KEM"], cs: true,
    def: "Module-Lattice-based Key-Encapsulation Mechanism: NIST's FIPS 203 (2024), derived from CRYSTALS-Kyber.",
    ex: "Already being deployed in TLS so that web connections resist future quantum attacks." },
  { term: "ML-DSA", aliases: ["ML-DSA"], cs: true,
    def: "Module-Lattice-based Digital Signature Algorithm: NIST's FIPS 204 (2024), derived from CRYSTALS-Dilithium.",
    ex: "Signing software updates so devices can verify they are genuine." },
  { term: "SLH-DSA", aliases: ["SLH-DSA"], cs: true,
    def: "Stateless Hash-based Digital Signature Algorithm: NIST's FIPS 205 (2024), from SPHINCS+. Its security rests only on hash functions.",
    ex: "A deliberate hedge — if lattice problems turn out easier than believed, hash-based signatures still stand." },
  { term: "FIPS", aliases: ["FIPS"], cs: true,
    def: "Federal Information Processing Standards: U.S. government standards published by NIST.",
    ex: "FIPS 203 is the ML-KEM standard." },

  // ------------------------------------------------------- case studies
  { term: "Trial division", aliases: ["trial division"],
    def: "Factoring N by trying every possible divisor up to √N. Exponential in the number of digits.",
    ex: "A 600-digit N would need about 10³⁰⁰ trial divisions." },
  { term: "Quadratic sieve", aliases: ["quadratic sieve"],
    def: "A factoring algorithm (Pomerance, 1981) that collects many numbers whose squares factor into small primes, then combines them to split N. Sub-exponential.",
    ex: "A variant of it factored RSA-129 in 1994." },
  { term: "Number field sieve", aliases: ["number field sieve"],
    def: "The fastest known classical algorithm for factoring large integers (around 1990), with cost L_N[1/3].",
    ex: "It has set every factoring record since 1996, including RSA-250 in 2020." },
  { term: "Set partitioning", aliases: ["set partitioning"],
    def: "Choose a collection of subsets so every item is covered exactly once, at minimum total cost.",
    ex: "Every flight (item) must be staffed by exactly one crew pairing (subset)." },
  { term: "LP relaxation", aliases: ["LP relaxation"],
    def: "The LP you get by dropping the whole-number requirement from an integer program. For a minimization, its optimum is a lower bound on the true optimum.",
    ex: "Allow x = 0.5 instead of only 0 or 1. If the relaxation's best cost is 100, no integer solution can cost less." },
  { term: "Dual values", aliases: ["dual values", "duals"],
    def: "Also called shadow prices: how much the optimal cost would change per unit change in each constraint's right-hand side.",
    ex: "A dual of 3 on a flight's coverage row means covering that flight \"costs\" 3 at the margin." },
  { term: "Column generation", aliases: ["column generation"],
    def: "Solving an LP with astronomically many variables by starting with a few and adding only those that could improve the solution, found by a pricing subproblem.",
    ex: "Start with 1,000 crew pairings out of billions, then add only the ones the duals say are worth it." },
  { term: "Pricing subproblem", aliases: ["pricing subproblem"],
    def: "In column generation, the search for a new variable (column) whose reduced cost is negative — one that would improve the current solution.",
    ex: "For crews: find the cheapest legal sequence of flights, priced using the current duals." },
  { term: "Shortest path", aliases: ["resource-constrained shortest path", "shortest-path", "shortest path"],
    def: "The minimum-cost route between two points in a network. The resource-constrained version adds limits such as hours worked, and becomes NP-hard in general.",
    ex: "The best legal crew pairing is a shortest path through a network of flights, with a limit on duty hours." },
  { term: "Branch-and-bound", aliases: ["branch-and-bound"],
    def: "Solving an integer program by splitting it into subproblems (branching) and discarding any whose relaxation bound cannot beat the best solution found so far (bounding).",
    ex: "Try x = 0 and x = 1 separately; if the x = 0 branch's LP bound is worse than a known solution, discard it." },
  { term: "Branch-and-price", aliases: ["branch-and-price", "Branch-and-price"],
    def: "Branch-and-bound in which the LP at every node is solved by column generation.",
    ex: "The standard method for airline crew scheduling (Barnhart et al., 1998)." },

  // ---------------------------------------------------- future of algorithms
  { term: "Strassen's algorithm", aliases: ["Strassen"], cs: true,
    def: "Multiplies n × n matrices in O(n^2.81) rather than O(n³) (1969), by using 7 block multiplications per 2 × 2 split instead of 8.",
    ex: "Two 4 × 4 matrices: 49 multiplications instead of 64." },
  { term: "Algorithm portfolio", aliases: ["algorithm portfolios", "algorithm portfolio"],
    def: "A collection of solvers plus a predictor that picks the best one for each problem instance.",
    ex: "SATzilla predicts, from features of a formula, which of several SAT solvers will finish first." },
  { term: "SATzilla", aliases: ["SATzilla"], cs: true,
    def: "An algorithm-portfolio SAT solver (Xu, Hutter, Hoos and Leyton-Brown) that picks which solver to run on each instance.",
    ex: "It won medals at the 2007 and 2009 SAT Competitions without being a new solver itself." },
  { term: "AlphaTensor", aliases: ["AlphaTensor"], cs: true,
    def: "A DeepMind system (2022) that used reinforcement learning to search for matrix-multiplication algorithms.",
    ex: "It found a 4 × 4 scheme in mod-2 arithmetic using 47 multiplications, beating Strassen's 49." },
  { term: "AlphaDev", aliases: ["AlphaDev"], cs: true,
    def: "A DeepMind system (2023) that used reinforcement learning to discover faster low-level sorting routines.",
    ex: "Its routines for sorting short sequences were merged into LLVM's C++ standard library." },
  { term: "LLVM libc++", aliases: ["libc++"],
    def: "LLVM's implementation of the C++ standard library, used with the Clang compiler.",
    ex: "std::sort in libc++ now contains AlphaDev-discovered code for small inputs." }
];

(function () {
  // Never match inside these: math, headings, interactive/controls, media, or
  // an existing glossary span.
  const SKIP = "mjx-container, .math, h1, h2, h3, a, button, select, option, input, " +
               "textarea, svg, video, script, style, .gl, .scaling-widget, " +
               ".slide-menu-wrapper, .controls, .progress, .slide-number, .footer";
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const html = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Flatten to (alias -> entry), longest alias first so the most specific wins.
  const rules = [];
  window.GLOSSARY.forEach((e, idx) => e.aliases.forEach(a => {
    const body = esc(a).replace(/ +/g, "\\s+");
    rules.push({
      idx, len: a.length,
      re: new RegExp("(^|[^A-Za-z0-9\\-])(" + body + ")(?![A-Za-z0-9\\-])", e.cs ? "" : "i")
    });
  }));
  rules.sort((x, y) => y.len - x.len);

  function textNodes(root) {
    const out = [];
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p = n.parentElement;
        if (!p || p.closest(SKIP)) return NodeFilter.FILTER_REJECT;
        // raw TeX not yet typeset: leave it alone
        if (/\\\(|\\\[|\$\$/.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    while (w.nextNode()) out.push(w.currentNode);
    return out;
  }

  function tooltipHTML(e) {
    return '<div class="gl-term">' + html(e.term) + '</div>' +
           '<div class="gl-def">' + html(e.def) + '</div>' +
           '<div class="gl-ex"><span>Example</span>' + html(e.ex) + '</div>';
  }

  function annotate(slide) {
    if (slide.dataset.glDone) return 0;
    slide.dataset.glDone = "1";
    const used = new Set();
    let count = 0;
    for (const r of rules) {
      if (used.has(r.idx)) continue;
      for (const node of textNodes(slide)) {
        const m = r.re.exec(node.nodeValue);
        if (!m) continue;
        const start = m.index + m[1].length, word = m[2];
        const after = node.splitText(start);
        after.nodeValue = after.nodeValue.slice(word.length);
        const span = document.createElement("span");
        span.className = "gl";
        span.tabIndex = 0;
        span.dataset.gl = r.idx;
        span.textContent = word;
        node.parentNode.insertBefore(span, after);
        used.add(r.idx); count++;
        break;
      }
    }
    return count;
  }

  function attachTooltips() {
    const spans = document.querySelectorAll(".gl:not([data-tip])");
    spans.forEach(s => {
      s.dataset.tip = "1";
      const e = window.GLOSSARY[+s.dataset.gl];
      if (window.tippy) {
        window.tippy(s, {
          content: tooltipHTML(e), allowHTML: true, theme: "gl",
          maxWidth: 380, placement: "top", delay: [60, 0],
          trigger: "mouseenter focus", touch: true,
          appendTo: () => document.body
        });
      } else {
        s.title = e.term + " — " + e.def + "  Example: " + e.ex;   // fallback
      }
    });
  }

  function run() {
    let total = 0;
    document.querySelectorAll(".reveal .slides section.slide").forEach(s => { total += annotate(s); });
    attachTooltips();
    window.GLOSSARY_STATS = { wrapped: total, entries: window.GLOSSARY.length };
  }

  if (window.Reveal && Reveal.isReady && Reveal.isReady()) run();
  else if (window.Reveal && Reveal.on) Reveal.on("ready", run);
  else document.addEventListener("DOMContentLoaded", () => setTimeout(run, 0));
})();
