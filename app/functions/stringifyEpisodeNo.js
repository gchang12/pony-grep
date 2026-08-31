export default function(episodeNo) {
  return String(episodeNo).padStart(2, '0');
}
