import './App.css'

function App() {

  const cppCode = `
//1.RANDOMIZED QUICKSORT
// 2. MST KRUSHKAL
// 3. BELLMAN FORD
// 4. RANDOMIZED SELECT
// 5. BTREE
// 6. KMP
//7. SUFFIX TREE USING BURTEFORCE SUFFICE TREE METHOD
// 8. trie for insert and search


//========================================================================
// 1. Randomized Quicksort and find no. of comparisons
#include <iostream>
#include <vector>
using namespace std;

int comparisons = 0;

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for(int j = low; j <= high - 1; j++) {
        comparisons++;
        if(arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

int randomPartition(vector<int>& arr, int low, int high) {
    int pivot = low + rand() % (high - low + 1);
    swap(arr[pivot], arr[high]);
    return partition(arr, low, high);
}

void randomizedQuickSort(vector<int>& arr, int low, int high) {
    if(low < high) {
        int pi = randomPartition(arr, low, high);
        randomizedQuickSort(arr, low, pi - 1);
        randomizedQuickSort(arr, pi + 1, high);
    }
}

int main() {
    // ------------ Test case 1 ------------
    vector<int> arr1 = {9, 4, 1, 7, 3};
    comparisons = 0; // reset
    randomizedQuickSort(arr1, 0, arr1.size() - 1);

    cout << "Test Case 1 - Sorted array: ";
    for(int x : arr1) cout << x << " ";
    cout << "\nComparisons: " << comparisons << "\n\n";

    // ------------ Test case 2 ------------
    vector<int> arr2 = {10, 2, 8, 6, 5, 1};
    comparisons = 0; // reset
    randomizedQuickSort(arr2, 0, arr2.size() - 1);

    cout << "Test Case 2 - Sorted array: ";
    for(int x : arr2) cout << x << " ";
    cout << "\nComparisons: " << comparisons << "\n";

    return 0;
}


//=================================================================
//2. Minimum spanning tree using kruskal's algorithm | Also showing the edges of the MST
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int findParent(int node, vector<int>& parent) {
  if (parent[node] == node) return node;
  return parent[node] = findParent(parent[node], parent);
}

void unionNodes(int node1, int node2, vector<int>& parent) {
  int parent1 = findParent(node1, parent);
  int parent2 = findParent(node2, parent);

  if (parent1 < parent2) parent[parent2] = parent1;
  else parent[parent1] = parent2;
}

void kruskalMST(int V, vector<vector<int>>& edges) {
  vector<int> parent(V);
  for (int i = 0; i < V; i++) parent[i] = i;

  sort(edges.begin(), edges.end(), [](vector<int>& a, vector<int>& b) {
    return a[2] < b[2];
  });

  int totalCost = 0;
  for (vector<int>& edge : edges) {
    int u = edge[0], v = edge[1], cost = edge[2];
    if (findParent(u, parent) != findParent(v, parent)) {
      unionNodes(u, v, parent);
      totalCost += cost;
      cout << "Edge: (" << u << ", " << v << ") Cost: " << cost << endl;
    }
  }

  cout << "Total cost of MST: " << totalCost << endl;
}

int main() {
  int V = 5;
  vector<vector<int>> edges = {
    {0, 1, 2},
    {0, 2, 3},
    {1, 2, 1},
    {1, 3, 4},
    {2, 3, 2},
    {2, 4, 5},
    {3, 4, 1}
  };
  kruskalMST(V, edges);
  return 0;
}
//==========================================================================
// 3. BELLAMAN
#include <iostream>
#include <vector>
using namespace std;

struct Edge{
    int u, v, w;
};

void BellmanFord(int V, vector<Edge> &edges, int source){
    int INF = 1000000000; 
    vector<int> dist(V, INF);
    dist[source] = 0;

    // Relax edges V-1 times
    for(int i = 0; i < V - 1; i++){
        for(int j = 0; j < edges.size(); j++){
            int u = edges[j].u;
            int v = edges[j].v;
            int w = edges[j].w;
            if(dist[u] != INF && dist[u] + w < dist[v]){
                dist[v] = dist[u] + w;
            }
        }
    }

    // Check negative cycle
    for(int j = 0; j < edges.size(); j++){
        int u = edges[j].u;
        int v = edges[j].v;
        int w = edges[j].w;
        if(dist[u] != INF && dist[u] + w < dist[v]){
            cout << "Graph contains a negative weight cycle!" << endl;
            return;
        }
    }

    // Print shortest distances
    for(int i = 0; i < V; i++){
        cout << "Distance of node " << i << " from source: ";
        if(dist[i] == INF) cout << "Unreachable";
        else cout << dist[i];
        cout << endl;
    }
    cout << endl;
}

int main(){

    // =======================
    // Test Case 1 (No cycle)
    // =======================
    cout << "===== Test Case 1 =====" << endl;
    
    int V1 = 5;
    vector<Edge> edges1 = {
        {0, 1, 6},
        {0, 2, 7},
        {1, 2, 8},
        {1, 3, -4},
        {1, 4, 5},
        {2, 3, 9},
        {2, 4, -3},
        {3, 1, -2},
        {4, 3, 7}
    };
    int source1 = 0;
    
    BellmanFord(V1, edges1, source1);


    // =======================
    // Test Case 2 (Negative cycle)
    // =======================
    cout << "===== Test Case 2 =====" << endl;

    int V2 = 4;
    vector<Edge> edges2 = {
        {0, 1, 1},
        {1, 2, -1},
        {2, 3, -1},
        {3, 1, -1}   // creates negative cycle
    };
    int source2 = 0;
    
    BellmanFord(V2, edges2, source2);

    return 0;
}



//===============================================================================
//4. Randomized Select
#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
using namespace std;

int comparisons = 0;

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for(int j = low; j < high; ++j) {
        comparisons++;
        if(arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

int randomPartition(vector<int>& arr, int low, int high) {
    int pivot = low + rand() % (high - low + 1);
    swap(arr[pivot], arr[high]);
    return partition(arr, low, high);
}

// randomized select (k is zero-based)
int randomizedSelect(vector<int>& arr, int low, int high, int k) {
    if (low == high)
        return arr[low];

    int pi = randomPartition(arr, low, high);

    if (pi == k)
        return arr[pi];
    else if (pi > k)
        return randomizedSelect(arr, low, pi - 1, k);
    else
        return randomizedSelect(arr, pi + 1, high, k);
}

int main() {
    srand(time(0));

    // -------------------------------
    // Example test cases
    // -------------------------------

    vector<vector<int>> tests = {
        {7, 2, 9, 4, 3, 8},
        {10, 5, 1, 8, 7},
        {23, 12, 45, 3, 19, 8, 30}
    };

    vector<int> ks = {3, 1, 5}; 
    // meaning: 3rd smallest, 1st smallest, 5th smallest in respective arrays

    for (int t = 0; t < tests.size(); t++) {
        vector<int> arr = tests[t];  // copy test
        comparisons = 0;

        int k = ks[t];  // 1-based
        int result = randomizedSelect(arr, 0, arr.size() - 1, k - 1);

        cout << "Test " << t + 1 << ": ";
        for (int x : tests[t]) cout << x << " ";

        cout << "\n" << k << "-th smallest element = " << result;
        cout << "\nComparisons = " << comparisons << "\n\n";
    }

    return 0;
}


    // ---------------------- Test Case 1 ----------------------
    cout << "===== Test Case 1 =====" << endl;
    vector<int> arr1 = {10, 4, 5, 8, 6, 11, 26};
    int k1 = 3;   // 3rd smallest element

    comparisons = 0; // reset
    int result1 = randomizedSelect(arr1, 0, arr1.size() - 1, k1 - 1);

    cout << k1 << "th smallest element: " << result1 << endl;
    cout << "Comparisons: " << comparisons << endl << endl;


    // ---------------------- Test Case 2 ----------------------
    cout << "===== Test Case 2 =====" << endl;
    vector<int> arr2 = {12, 7, 9, 21, 13, 2, 1, 5};
    int k2 = 5;   // 5th smallest element

    comparisons = 0; // reset
    int result2 = randomizedSelect(arr2, 0, arr2.size() - 1, k2 - 1);

    cout << k2 << "th smallest element: " << result2 << endl;
    cout << "Comparisons: " << comparisons << endl;

    return 0;
}


//=======================================================================================
// 5. BTREE
#include <iostream>
using namespace std;

#define ORDER 3   // max 2 keys per node, 3 children

// Node structure
struct BNode {
    int keys[ORDER - 1];
    BNode* child[ORDER];
    int keyCount;
    bool isLeaf;

    BNode() {
        keyCount = 0;
        isLeaf = true;
        for(int i = 0; i < ORDER; i++) {
            child[i] = NULL;
        }
    }
};

// Split full child
void splitChild(BNode* parent, int index, BNode* fullChild) {
    BNode* newChild = new BNode();
    newChild->isLeaf = fullChild->isLeaf;

    newChild->keys[0] = fullChild->keys[1];
    newChild->keyCount = 1;

    if (!fullChild->isLeaf) {
        newChild->child[0] = fullChild->child[2];
        newChild->child[1] = fullChild->child[3];
    }

    fullChild->keyCount = 1;

    for(int i = parent->keyCount; i >= index + 1; i--) {
        parent->child[i + 1] = parent->child[i];
    }
    parent->child[index + 1] = newChild;

    for(int i = parent->keyCount - 1; i >= index; i--) {
        parent->keys[i + 1] = parent->keys[i];
    }

    parent->keys[index] = fullChild->keys[1];
    parent->keyCount++;
}

// Insert in non-full node
void insertNonFull(BNode* node, int key) {
    int i = node->keyCount - 1;

    if (node->isLeaf) {
        while(i >= 0 && key < node->keys[i]) {
            node->keys[i + 1] = node->keys[i];
            i--;
        }
        node->keys[i + 1] = key;
        node->keyCount++;
    } else {
        while(i >= 0 && key < node->keys[i]) {
            i--;
        }
        i++;

        if (node->child[i]->keyCount == ORDER - 1) {
            splitChild(node, i, node->child[i]);
            if (key > node->keys[i]) {
                i++;
            }
        }
        insertNonFull(node->child[i], key);
    }
}

// Insert key
void insert(BNode* &root, int key) {
    if (root->keyCount == ORDER - 1) {
        BNode* newRoot = new BNode();
        newRoot->isLeaf = false;
        newRoot->child[0] = root;

        splitChild(newRoot, 0, root);

        int i = 0;
        if (key > newRoot->keys[0]) i++;
        insertNonFull(newRoot->child[i], key);

        root = newRoot;
    } else {
        insertNonFull(root, key);
    }
}

// Print B-tree
void printTree(BNode* node, int level = 0) {
    if (!node) return;

    cout << "Level " << level << " : ";
    for(int i = 0; i < node->keyCount; i++) {
        cout << node->keys[i] << " ";
    }
    cout << endl;

    if(!node->isLeaf) {
        for(int i = 0; i <= node->keyCount; i++) {
            printTree(node->child[i], level + 1);
        }
    }
}

int main() {

    // ================= Test Case 1 =================
    cout << "===== Test Case 1 =====" << endl;

    BNode* root1 = new BNode();
    int arr1[] = {10, 20, 5, 6, 12, 30, 7, 17};
    int n1 = sizeof(arr1) / sizeof(arr1[0]);

    for(int i = 0; i < n1; i++) {
        insert(root1, arr1[i]);
    }

    printTree(root1);
    cout << endl;


    // ================= Test Case 2 =================
    cout << "===== Test Case 2 =====" << endl;

    BNode* root2 = new BNode();
    int arr2[] = {50, 40, 30, 20, 10, 60, 70, 80};
    int n2 = sizeof(arr2) / sizeof(arr2[0]);

    for(int i = 0; i < n2; i++) {
        insert(root2, arr2[i]);
    }

    printTree(root2);

    return 0;
}


//=======================================================================================
// 6. KMP
#include <iostream>
using namespace std;

// Function to build LPS array
void buildLPS(string pat, int lps[]) {
    int len = 0;   // length of previous longest prefix suffix
    lps[0] = 0;

    int i = 1;
    while (i < pat.length()) {

        if (pat[i] == pat[len]) {
            len++;
            lps[i] = len;
            i++;
        }
        else {
            if (len != 0) {
                len = lps[len - 1];  
            }
            else {
                lps[i] = 0;
                i++;
            }
        }
    }
}

// KMP search
void KMPsearch(string text, string pat) {
    int n = text.length();
    int m = pat.length();

    int lps[m];
    buildLPS(pat, lps);

    int i = 0;  // text pointer
    int j = 0;  // pattern pointer

    while (i < n) {

        if (text[i] == pat[j]) {
            i++;
            j++;
        }

        if (j == m) {
            cout << "Pattern found at index " << i - j << endl;
            j = lps[j - 1]; 
        }

        else if (i < n && text[i] != pat[j]) {

            if (j != 0) {
                j = lps[j - 1];
            }
            else {
                i++;
            }
        }
    }
}

int main() {
    string text = "ABABDABACDABABCABAB";
    string pat = "ABABCABAB";
    cout<< "Text is -> " << text << "  ,pattern is -> "<< pat <<endl;
    KMPsearch(text, pat);

    return 0;
}

//=======================================================================================
// 7. SUFFIX TREE USING BURTEFORCE SUFFICE TREE METHOD
#include <iostream>
using namespace std;

#define ALPHABET 256   // for all ASCII chars

// Node of suffix tree (really a trie)
struct Node {
    Node* child[ALPHABET];
    bool endMark;

    Node() {
        endMark = false;
        for (int i = 0; i < ALPHABET; i++) {
            child[i] = NULL;
        }
    }
};

// Insert a suffix starting at index "start"
void insertSuffix(Node* root, string &text, int start) {
    Node* cur = root;

    for (int i = start; i < text.length(); i++) {
        char c = text[i];

        if (cur->child[(int)c] == NULL) {
            cur->child[(int)c] = new Node();
        }
        cur = cur->child[(int)c];
    }

    cur->endMark = true;
}

// Build suffix tree by inserting all suffixes
Node* buildSuffixTree(string text) {
    Node* root = new Node();

    for (int i = 0; i < text.length(); i++) {
        insertSuffix(root, text, i);
    }

    return root;
}

// Print tree (DFS)
void printTree(Node* node, string path = "") {
    if (node->endMark) {
        cout << path << endl;
    }

    for (int c = 0; c < ALPHABET; c++) {
        if (node->child[c] != NULL) {
            char ch = (char)c;
            printTree(node->child[c], path + ch);
        }
    }
}

int main() {
    string text = "banana";

    Node* root = buildSuffixTree(text);
    cout << "Text is -> " << text <<endl;
    cout << "All suffixes in the suffix tree:" << endl;
    printTree(root);

    return 0;
}

//=============================================================
// 8. trie for insert and delete
#include <iostream>
#include <string>
using namespace std;

// Trie Node
class TrieNode {
public:
    TrieNode* child[26];
    bool isEnd;

    TrieNode() {
        isEnd = false;
        for(int i = 0; i < 26; i++)
            child[i] = NULL;
    }
};

// Trie Data Structure
class Trie {
private:
    TrieNode* root;

public:
    Trie() {
        root = new TrieNode();
    }

    // Insert a word
    void insert(const string &word) {
        TrieNode* curr = root;

        for(char c : word) {
            int idx = c - 'a';
            if(curr->child[idx] == NULL) {
                curr->child[idx] = new TrieNode();
            }
            curr = curr->child[idx];
        }
        curr->isEnd = true;
    }

    // Search a word
    bool search(const string &word) {
        TrieNode* curr = root;

        for(char c : word) {
            int idx = c - 'a';
            if(curr->child[idx] == NULL)
                return false;
            curr = curr->child[idx];
        }
        return curr->isEnd;
    }
};

int main() {
    Trie t;

    // Insert words
    t.insert("apple");
    t.insert("app");
    t.insert("bat");
    t.insert("ball");

    // Test searches
    cout << (t.search("apple") ? "Found" : "Not Found") << endl;
    cout << (t.search("app") ? "Found" : "Not Found") << endl;
    cout << (t.search("bat") ? "Found" : "Not Found") << endl;

    cout << (t.search("bad") ? "Found" : "Not Found") << endl;
    cout << (t.search("balloon") ? "Found" : "Not Found") << endl;

    return 0;
}


`;

  return (
    <>
      <pre><code>{cppCode}</code></pre>
    </>
  )
}

export default App