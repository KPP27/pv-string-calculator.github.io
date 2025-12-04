from src.calc import voc_cold, compute_max_panels

def test_voc_cold():
    assert round(voc_cold(40, -0.3, -10), 2) == 41.32

def test_compute_max_panels():
    result = compute_max_panels(40, 33, -0.3, -10, 200, 500, 600)
    assert result['N_max'] <= result['N_voc_max']
