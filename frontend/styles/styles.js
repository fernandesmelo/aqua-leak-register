import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#F1F8F5' },
  card: { marginBottom: 10 },
  image: { height: 200, width: '100%', marginTop: 5 },
  input: { marginBottom: 10 },
  fab: {
    position: 'absolute', bottom: 20, right: 20, backgroundColor: '#9381ff',
    width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center'
  },
  fabText: { fontSize: 24, color: '#fff' },
  mapButton: {
    position: 'absolute', bottom: 20, left: 20, backgroundColor: '#ff6f61',
    width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center'
  },
});