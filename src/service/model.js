import * as tf from "@tensorflow/tfjs";

class HAR {
	/** @type tf.LayersModel */
	model;
	seq = [];
	async loadModel() {
		this.model = await tf.loadLayersModel("model.json");
	}

	/**
	 *
	 * @param {tf.Tensor} input
	 * @returns {Promise<number[]>}
	 */
	async predict(input) {
		return await this.model.predict(input).squeeze().array();
	}
}

export const har = new HAR();