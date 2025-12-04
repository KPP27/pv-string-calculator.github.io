import math

def voc_cold(voc_stc, alpha_percent_per_C, T_min):
    alpha = alpha_percent_per_C / 100.0
    return voc_stc * (1 + alpha * (T_min - 25))

def compute_max_panels(voc_stc, vmp_stc, alpha_pct, T_min, V_mppt_min, V_mppt_max, V_inverter_max, safety_margin=0.0):
    voc_col = voc_cold(voc_stc, alpha_pct, T_min)
    V_allowed_max = V_inverter_max * (1 - safety_margin)
    N_voc_max = int(V_allowed_max // voc_col)
    N_mppt_min = int(math.ceil(V_mppt_min / vmp_stc))
    N_mppt_max = int(V_mppt_max // vmp_stc)
    N_max = min(N_voc_max, N_mppt_max)
    ok = N_max >= N_mppt_min
    return {
        'voc_cold': voc_col,
        'N_voc_max': N_voc_max,
        'N_mppt_min': N_mppt_min,
        'N_mppt_max': N_mppt_max,
        'N_max': N_max,
        'ok': ok
    }

if __name__ == "__main__":
    result = compute_max_panels(
        voc_stc=40.2, vmp_stc=33.8, alpha_pct=-0.32, T_min=-10,
        V_mppt_min=200, V_mppt_max=500, V_inverter_max=600
    )
    print(result)
