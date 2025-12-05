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


//========================================================================
//1. Randomized Quicksort and find no. of comparisons
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
  int n;
  cout << "Enter the number of elements: ";
  cin >> n;
  vector<int> arr(n);
  cout << "Enter the elements: ";
  for(int i = 0; i < n; i++) {
    cin >> arr[i];
  }
  randomizedQuickSort(arr, 0, n - 1);
  cout << "Sorted array: ";
  for(int i = 0; i < n; i++) {
    cout << arr[i] << " ";
  }
  cout << endl;
  cout << "Number of comparisons: " << comparisons << endl;
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

  for (int i = 0; i < V - 1; i++) {
    for (int j = 0; j < edges.size(); j++) {
      int u = edges[j].u;
      int v = edges[j].v;
      int w = edges[j].w;
      if (dist[u] != INF && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }

  // Negative weight cycle check
  for (int j = 0; j < edges.size(); j++){
    int u = edges[j].u;
    int v = edges[j].v;
    int w = edges[j].w;
    if (dist[u] != INF && dist[u] + w < dist[v]) {
      cout << "Graph contains a negative weight cycle!" << endl;
      return;
    }
  }

  // Print shortest distances
  for (int i = 0; i < V; i++) {
    cout << "Distance of node " << i << " from source: ";
    if (dist[i] == INF) cout << "Unreachable";
    else cout << dist[i];
    cout << endl;
  }
}

int main() {
  int V, E, source;
  cout << "Enter the number of vertices, edges, and source: ";
  cin >> V >> E >> source;
  vector<Edge> edges(E);
  for (int i = 0; i < E; i++) {
    cout << "Enter the edges (u v w): ";
    cin >> edges[i].u >> edges[i].v >> edges[i].w;
  }
  BellmanFord(V, edges, source);
  return 0;
}
//===============================================================================
//4. Randomized Select
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

int randomizedSelect(vector<int>& arr, int low, int high, int k) {
  if(low == high) {
    return arr[low];
  }
  int pi = randomPartition(arr, low, high);
  if(pi < k) {
    return randomizedSelect(arr, pi + 1, high, k);
  } else if(pi > k) {
    return randomizedSelect(arr, low, pi - 1, k);
  } else {
    return arr[pi];
  }
}

int main() {
  int n;
  cout << "Enter the number of elements: ";
  cin >> n;
  vector<int> arr(n);
  cout << "Enter the elements: ";
  for(int i = 0; i < n; i++) {
    cin >> arr[i];
  }
  int k;
  cout << "Enter the value of k: ";
  cin >> k;
  int result = randomizedSelect(arr, 0, n - 1, k - 1);
  cout << "The " << k << "th smallest element is: " << result << endl;
  cout << "Number of comparisons: " << comparisons << endl;
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

// Function to split a full child
void splitChild(BNode* parent, int index, BNode* fullChild) {
    BNode* newChild = new BNode();
    newChild->isLeaf = fullChild->isLeaf;

    // Move one key to new node
    newChild->keys[0] = fullChild->keys[1];
    newChild->keyCount = 1;

    if (!fullChild->isLeaf) {
        newChild->child[0] = fullChild->child[2];
        newChild->child[1] = fullChild->child[3];
    }

    fullChild->keyCount = 1;

    // Move parent's children
    for (int i = parent->keyCount; i >= index + 1; i--) {
        parent->child[i + 1] = parent->child[i];
    }

    parent->child[index + 1] = newChild;

    // Move parent's keys
    for (int i = parent->keyCount - 1; i >= index; i--) {
        parent->keys[i + 1] = parent->keys[i];
    }

    parent->keys[index] = fullChild->keys[1];
    parent->keyCount++;
}

// Insert in non-full node
void insertNonFull(BNode* node, int key) {
    int i = node->keyCount - 1;

    if (node->isLeaf) {
        // Insert key in sorted order
        while (i >= 0 && key < node->keys[i]) {
            node->keys[i + 1] = node->keys[i];
            i--;
        }
        node->keys[i + 1] = key;
        node->keyCount++;
    } else {
        // Find child to insert
        while (i >= 0 && key < node->keys[i]) {
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

// Insert a new key
void insert(BNode* &root, int key) {
    if (root->keyCount == ORDER - 1) {
        BNode* newRoot = new BNode();
        newRoot->isLeaf = false;
        newRoot->child[0] = root;

        splitChild(newRoot, 0, root);

        int i = 0;
        if (key > newRoot->keys[0])
            i++;
        insertNonFull(newRoot->child[i], key);

        root = newRoot;
    } else {
        insertNonFull(root, key);
    }
}

// Print tree (simple)
void printTree(BNode* node, int level = 0) {
    if (node == NULL) return;

    cout << "Level " << level << " : ";
    for (int i = 0; i < node->keyCount; i++) {
        cout << node->keys[i] << " ";
    }
    cout << endl;

    if (!node->isLeaf) {
        for (int i = 0; i <= node->keyCount; i++) {
            printTree(node->child[i], level + 1);
        }
    }
}

int main() {
    BNode* root = new BNode();

    int arr[] = {10, 20, 5, 6, 12, 30, 7, 17};
    int n = sizeof(arr) / sizeof(arr[0]);

    for (int i = 0; i < n; i++) {
        insert(root, arr[i]);
    }

    printTree(root);

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

    cout << "All suffixes in the suffix tree:" << endl;
    printTree(root);

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