import './App.css'

function App() {

  const cppCode = `
//1.RANDOMIZED QUICKSORT
// 2. MST KRUSHKAL
// 3. BELLMAN FORD
// 4. RANDOMIZED SELECT


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
// 5.
//=======================================================================================
// 6.
//=======================================================================================
// 7.

`;

  return (
    <>
      <pre><code>{cppCode}</code></pre>
    </>
  )
}

export default App