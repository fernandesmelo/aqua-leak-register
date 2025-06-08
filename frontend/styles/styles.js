import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#e3f2fd' },
  card: { marginBottom: 10 },
  image: { height: 200, width: '100%', marginTop: 5 },
  input: { marginBottom: 10 },
  fab: {
    position: 'absolute', bottom: 20, right: 20, backgroundColor: '#1976d2',
    width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center'
  },
  fabText: { fontSize: 24, color: '#fff' },
  mapButton: {
    position: 'absolute', bottom: 20, left: 20, backgroundColor: '#1565c0',
    width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center'
  },
});